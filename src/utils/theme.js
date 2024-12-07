/**
 * Get the system color scheme preference
 */
export const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

/**
 * Initialize theme based on user preference or system setting
 */
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || getSystemTheme();
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  return theme;
};

/**
 * Set the theme and update localStorage
 */
export const setTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};