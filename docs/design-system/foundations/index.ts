
/**
 * DIG|LIT Design System Foundations
 * Export all foundational design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './animations';

// Combined design tokens
export const designTokens = {
  colors: require('./colors').colors,
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
  shadows: require('./shadows').shadows,
  animations: require('./animations').animations,
};
