
/**
 * DIG|LIT Shadow System
 * Glowing amber shadows for depth and emphasis
 */

export const shadows = {
  // Standard shadows
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Amber glow shadows
  glow: {
    sm: '0 0 10px rgba(251, 191, 36, 0.3)',
    DEFAULT: '0 0 20px rgba(251, 191, 36, 0.4)',
    md: '0 0 30px rgba(251, 191, 36, 0.5)',
    lg: '0 0 40px rgba(251, 191, 36, 0.6)',
    xl: '0 0 50px rgba(251, 191, 36, 0.7)',
  },

  // Text shadows
  text: {
    sm: '0 0 8px rgba(255, 255, 255, 0.15)',
    DEFAULT: '0 0 12px rgba(255, 255, 255, 0.2)',
    md: '0 0 16px rgba(255, 255, 255, 0.25)',
    lg: '0 0 20px rgba(255, 255, 255, 0.3)',
    glow: '0 0 18px rgba(255, 255, 255, 0.25)',
  },

  // Drop shadows (for filters)
  drop: {
    sm: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))',
    DEFAULT: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.8))',
    md: 'drop-shadow(0 0 16px rgba(250, 204, 21, 0.9))',
    lg: 'drop-shadow(0 0 20px rgba(250, 204, 21, 1))',
  },
} as const;

export type ShadowToken = typeof shadows;
