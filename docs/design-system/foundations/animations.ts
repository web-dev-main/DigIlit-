
/**
 * DIG|LIT Animation System
 * Smooth, purposeful animations
 */

export const animations = {
  // Durations
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Keyframes
  keyframes: {
    blink: {
      '0%, 49%': { opacity: '1' },
      '50%, 99%': { opacity: '0.2' },
      '100%': { opacity: '1' },
    },
    glow: {
      '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.6))' },
      '50%': { filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 1))' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.9)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    rotate: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },

  // Prebuilt animations
  presets: {
    blink: 'blink 1.5s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite',
    float: 'float 3s ease-in-out infinite',
    shimmer: 'shimmer 2s linear infinite',
    fadeIn: 'fadeIn 0.3s ease-out',
    fadeOut: 'fadeOut 0.3s ease-out',
    slideUp: 'slideUp 0.5s ease-out',
    slideDown: 'slideDown 0.5s ease-out',
    scaleIn: 'scaleIn 0.3s ease-out',
    rotate: 'rotate 20s linear infinite',
  },
} as const;

export type AnimationToken = typeof animations;
