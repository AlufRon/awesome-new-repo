import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = {
  help: 'Show available commands',
  about: 'Navigate to About page',
  skills: 'Navigate to Skills page',
  projects: 'View projects',
  experience: 'View work experience',
  contact: 'Get in touch',
  clear: 'Clear terminal',
  theme: 'Toggle dark/light mode',
};

const TerminalNav = ({ onThemeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(['Welcome! Type \'help\' to see available commands']);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl + ` to toggle terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [history]);

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    
    if (command === 'help') {
      setHistory(prev => [...prev, `> ${cmd}`, ...Object.entries(COMMANDS).map(([key, value]) => `${key}: ${value}`)]);
    } else if (command === 'clear') {
      setHistory(['Terminal cleared']);
    } else if (command === 'theme') {
      onThemeToggle();
      setHistory(prev => [...prev, `> ${cmd}`, 'Theme toggled']);
    } else if (COMMANDS[command]) {
      navigate(`/${command === 'about' ? '' : command}`);
      setHistory(prev => [...prev, `> ${cmd}`, `Navigating to ${command}...`]);
    } else if (command) {
      setHistory(prev => [...prev, `> ${cmd}`, `Command not found: ${cmd}. Type 'help' for available commands`]);
    }

    // Add to command history
    if (command) {
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(newIndex >= 0 ? commandHistory[commandHistory.length - 1 - newIndex] : '');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-black bg-opacity-90 text-green-400 font-mono p-4 h-64 overflow-hidden">
      <div
        ref={terminalRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-transparent"
      >
        {history.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        <div className="flex items-center">
          <span className="mr-2">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            spellCheck="false"
          />
        </div>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-green-400 hover:text-green-300"
      >
        ×
      </button>
    </div>
  );
};

export default TerminalNav;