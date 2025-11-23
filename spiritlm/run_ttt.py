import torch
import torchaudio
import logging
import os
from copy import deepcopy
from spiritlm.model.spiritlm_model import Spiritlm, ContentType, GenerationInput, OutputModality

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("TTT")

class SpiritTTTSession:
    def __init__(self, spirit_wrapper, learning_rate=1e-4):
        self.wrapper = spirit_wrapper
        self.hf_model = spirit_wrapper.model
        self.lr = learning_rate
        self.original_weights = {}
        self.device = spirit_wrapper.device

    def __enter__(self):
        logger.info("Initializing TTT Session...")

        # 1. Freeze the entire model & Set to EVAL mode
        # We keep it in EVAL to disable Dropout, ensuring deterministic updates
        self.hf_model.eval()
        for param in self.hf_model.parameters():
            param.requires_grad = False

        # 2. Unfreeze ONLY the MLP Down-Projection layers
        params_to_optimize = []
        trainable_layers = 0

        for i, layer in enumerate(self.hf_model.model.layers):
            module = layer.mlp.down_proj

            # Backup weights to CPU
            self.original_weights[i] = module.weight.data.clone().cpu()

            # Enable training for this specific layer
            module.weight.requires_grad = True
            params_to_optimize.append(module.weight)
            trainable_layers += 1

        logger.info(f"Unlocked {trainable_layers} MLP layers for adaptation.")

        self.optimizer = torch.optim.AdamW(params_to_optimize, lr=self.lr)
        return self

    def train_on_audio(self, audio_path, chunk_size=512):
        logger.info(f"Processing audio: {audio_path}")

        if not os.path.exists(audio_path):
            logger.error(f"Audio file not found: {audio_path}")
            return

        try:
            wav = torchaudio.load(audio_path)[0].squeeze()
        except Exception as e:
            logger.error(f"Error loading audio: {e}")
            return

        # Step 1: Tokenization using internal SpiritLM logic
        gen_input = GenerationInput(content=wav, content_type=ContentType.SPEECH)
        prompt_str = self.wrapper._build_prompt([gen_input], OutputModality.ARBITRARY)
        input_ids = self.wrapper.tokenizer(prompt_str, return_tensors="pt").input_ids.to(self.device)

        seq_len = input_ids.size(1)
        logger.info(f"Context Length: {seq_len} tokens.")

        # Step 2: Training Loop
        # NOTE: We do NOT call self.hf_model.train() here.
        # We stay in eval mode to avoid Dropout noise, but gradients will still flow
        # because requires_grad=True on the MLP layers.

        total_loss = 0
        steps = 0

        for i in range(0, seq_len - 1, chunk_size):
            end_idx = min(i + chunk_size, seq_len)
            if end_idx - i < 10: continue

            chunk = input_ids[:, i : end_idx]

            # Forward Pass
            outputs = self.hf_model(input_ids=chunk)
            logits = outputs.logits

            # Loss Calculation (Next Token Prediction)
            shift_logits = logits[..., :-1, :].contiguous()
            shift_labels = chunk[..., 1:].contiguous()

            loss = torch.nn.functional.cross_entropy(
                shift_logits.view(-1, shift_logits.size(-1)),
                shift_labels.view(-1)
            )

            # Update Weights
            self.optimizer.zero_grad()
            loss.backward()
            self.optimizer.step()

            total_loss += loss.item()
            steps += 1

            if steps % 10 == 0:
                logger.info(f"Step {steps}: Loss = {loss.item():.4f}")

        avg_loss = total_loss / steps if steps > 0 else 0
        logger.info(f"TTT Complete. Steps: {steps}, Avg Loss: {avg_loss:.4f}")

    def __exit__(self, exc_type, exc_val, exc_tb):
        logger.info("Resetting model weights...")
        with torch.no_grad():
            for i, layer in enumerate(self.hf_model.model.layers):
                if i in self.original_weights:
                    module = layer.mlp.down_proj
                    module.weight.data.copy_(self.original_weights[i].to(self.device))
                    module.weight.requires_grad = False
        logger.info("Model reset successfully.")

if __name__ == "__main__":
    # Configuration
    MODEL_NAME = "spirit-lm-base-7b"
    AUDIO_FILE = "examples/audio/7143-88743-0029.flac"

    print(f"Loading {MODEL_NAME}...")
    spirit = Spiritlm(MODEL_NAME)

    with SpiritTTTSession(spirit) as ttt:
        print("\n--- PHASE 1: LEARNING (TTT) ---")
        ttt.train_on_audio(AUDIO_FILE)

        print("\n--- PHASE 2: GENERATING ---")
        # We ask the model to continue from a text prompt, relying on its updated weights
        # to inform the context.
        prompt_text = "[Text] The audio I just listened to can be described as:"

        outputs = spirit.generate(
            prompt=prompt_text,
            output_modality="TEXT",
            max_new_tokens=50,
            temperature=0.6
        )

        print(f"\nModel Answer:\n{outputs[0].content}")

    print("\nDone.")
