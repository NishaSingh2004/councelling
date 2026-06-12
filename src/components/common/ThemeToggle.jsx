import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useApp();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 dark:bg-sage-900 dark:hover:bg-sage-800 text-sage-700 dark:text-sage-300 transition-all duration-300 shadow-sm border border-beige-200/50 dark:border-sage-800/30 hover:scale-105"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-amber-500 animate-pulse-subtle" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-600" />
      )}
    </button>
  );
}
