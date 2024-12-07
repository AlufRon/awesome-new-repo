export const typewriterAnimation = (text, speed = 100) => {
  return new Promise((resolve) => {
    let i = 0;
    let result = '';
    const interval = setInterval(() => {
      if (i < text.length) {
        result += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        resolve(result);
      }
    }, speed);
  });
};

export const scrollAnimation = (element, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    root: null,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });

  observer.observe(element);
  return () => observer.disconnect();
};

export const particleAnimation = (canvas, options = {}) => {
  const ctx = canvas.getContext('2d');
  const particles = [];

  const defaultOptions = {
    particleCount: 50,
    color: '#6366f1',
    speed: 1,
    size: 2
  };

  const settings = { ...defaultOptions, ...options };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * settings.speed;
      this.vy = (Math.random() - 0.5) * settings.speed;
      this.size = settings.size;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = settings.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < settings.particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
  return particles;
};