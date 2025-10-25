
/**
 * DIG|LIT Color System
 * Premium amber/gold palette with dark backgrounds
 */

export const colors = {
  // Primary Palette
  primary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24', // Main brand color
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Amber Variations
  amber: {
    light: '#fde047',
    DEFAULT: '#fbbf24',
    dark: '#f59e0b',
    glow: 'rgba(251, 191, 36, 0.8)',
  },

  // Gold Variations
  gold: {
    light: '#fef3c7',
    DEFAULT: '#facc15',
    dark: '#eab308',
  },

  // Background System
  background: {
    primary: '#000000',
    secondary: 'rgba(120, 53, 15, 0.1)', // amber-950/10
    tertiary: 'rgba(120, 53, 15, 0.2)', // amber-950/20
    card: 'rgba(0, 0, 0, 0.4)',
    cardHover: 'rgba(0, 0, 0, 0.6)',
  },

  // Text System
  text: {
    primary: '#e5e7eb', // gray-200
    secondary: 'rgba(251, 191, 36, 0.9)', // amber-400/90
    muted: 'rgba(251, 191, 36, 0.7)', // amber-400/70
    gradient: {
      silver: 'linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 45%, #94a3b8 100%)',
      gold: 'linear-gradient(to right, #fbbf24, #fde047, #facc15)',
      amber: 'linear-gradient(to bottom right, #fef3c7, #fde68a, #fbbf24)',
    },
  },

  // Border System
  border: {
    default: 'rgba(251, 191, 36, 0.3)',
    hover: 'rgba(251, 191, 36, 0.4)',
    active: 'rgba(251, 191, 36, 1)',
    glow: 'rgba(251, 191, 36, 0.2)',
  },

  // Status Colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

export type ColorToken = typeof colors;
