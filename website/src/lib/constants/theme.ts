export const THEME_COLORS = {
  light: {
    background: '#f9fafb',
    foreground: '#111827',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#e5e7eb',
  },
} as const;

export type ThemeColors = typeof THEME_COLORS;
