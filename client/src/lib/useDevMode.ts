import { useState, useEffect } from 'react';

export function useDevMode() {
  const [isDevMode, setIsDevMode] = useState(() => {
    try {
      // Check localStorage first
      const savedMode = localStorage.getItem('devMode');
      return savedMode === 'true';
    } catch (error) {
      console.warn('Failed to read devMode from localStorage:', error);
      return false;
    }
  });

  useEffect(() => {
    try {
      // Save to localStorage when dev mode changes
      localStorage.setItem('devMode', String(isDevMode));
    } catch (error) {
      console.warn('Failed to save devMode to localStorage:', error);
    }
  }, [isDevMode]);

  return {
    isDevMode,
    setIsDevMode
  };
} 