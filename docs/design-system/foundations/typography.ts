
/**
 * DIG|LIT Typography System
 * Orbitron for headers, Inter for body text
 */

export const typography = {
  // Font Families
  fonts: {
    heading: "'Orbitron', sans-serif",
    body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "Menlo, Monaco, 'Courier New', monospace",
  },

  // Font Sizes (using clamp for fluid typography)
  sizes: {
    // Hero/Display
    hero: 'clamp(2.8rem, 9.5vw, 9rem)', // 44.8px - 144px
    display: 'clamp(2.5rem, 8vw, 6rem)', // 40px - 96px
    
    // Headers
    h1: 'clamp(2rem, 5vw, 4rem)', // 32px - 64px
    h2: 'clamp(1.75rem, 4vw, 3rem)', // 28px - 48px
    h3: 'clamp(1.5rem, 3vw, 2rem)', // 24px - 32px
    h4: 'clamp(1.25rem, 2.5vw, 1.75rem)', // 20px - 28px
    h5: 'clamp(1.125rem, 2vw, 1.5rem)', // 18px - 24px
    h6: 'clamp(1rem, 1.5vw, 1.25rem)', // 16px - 20px
    
    // Body
    large: 'clamp(1.125rem, 2vw, 1.25rem)', // 18px - 20px
    base: 'clamp(0.95rem, 1.5vw, 1.1rem)', // 15.2px - 17.6px
    small: 'clamp(0.875rem, 1.25vw, 1rem)', // 14px - 16px
    tiny: 'clamp(0.75rem, 1vw, 0.875rem)', // 12px - 14px
    
    // Special
    tagline: 'clamp(1rem, 3.2vw, 2.6rem)', // 16px - 41.6px
  },

  // Font Weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeights: {
    tight: 0.92,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type TypographyToken = typeof typography;
