
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
        variant="outline"
        onClick={toggleTheme}
        className="!w-12 !h-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isDark ? (
          <Sun className="!h-8 !w-8 text-yellow-500" />  // ← larger icon
        ) : (
          <Moon className="!h-8 !w-8 text-slate-600" />   // ← larger icon
        )}
      </Button>
  );
};

export default ThemeToggle;
