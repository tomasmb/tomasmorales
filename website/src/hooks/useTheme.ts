'use client';

import { useEffect, useState } from 'react';
import { THEME_COLORS } from '@/lib/constants/theme';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Get the actual theme being displayed (resolves 'system' to 'light' or 'dark')
  const getResolvedTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const resolvedTheme = newTheme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;

    // Remove both classes first
    root.classList.remove('light', 'dark');
    // Add the resolved theme class
    root.classList.add(resolvedTheme);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark'
          ? THEME_COLORS.dark.background
          : THEME_COLORS.light.background
      );
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Try to get theme from localStorage
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || 'system';

    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme, mounted]);

  return {
    theme,
    setTheme,
    resolvedTheme: mounted ? getResolvedTheme() : 'light',
    mounted,
  };
}
