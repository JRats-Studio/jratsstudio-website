// Design System Colors
export const COLORS = {
  PRIMARY: '#08cb00',
  SECONDARY: '#253900',
  BACKGROUND: '#000000',
  FOREGROUND: '#ffffff',
  MUTED: '#1a1a1a',
} as const;

// Z-Index Scale
export const Z_INDEX = {
  PRELOADER: 100,
  NOISE_OVERLAY: 50,
  HEADER: 40,
  CONTENT: 10,
  BACKGROUND_EFFECTS: 0,
} as const;

// Animation Timings (in milliseconds)
export const TIMING = {
  PRELOADER_DURATION: 5000,
  DEFAULT_TRANSITION: 800,
  SCROLL_DURATION: 1200,
} as const;
