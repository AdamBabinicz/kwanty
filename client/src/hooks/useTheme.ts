import { useEffect } from 'react';
import { useQuantumState } from './useQuantumState';

export function useTheme() {
  const { isDarkMode, toggleTheme } = useQuantumState();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
}
