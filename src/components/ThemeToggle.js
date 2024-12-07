import React from 'react';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getSystemTheme, setTheme as setGlobalTheme } from '../utils/theme';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || getSystemTheme();
    }
    return 'light';
  });

  useEffect(() => {
    setGlobalTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;