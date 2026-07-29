
const theme = {
  colors: {
    background: '#0F0B1A',
    surface: '#1A1425',
    surfaceRaised: '#241C33',

    primary: '#A78BFA',
    primaryStrong: '#7C3AED',

    text: '#F3F1F7',
    textMuted: '#B8B0C7',

    pass: '#4ADE80',
    fail: '#F87171',
    warning: '#FBBF24',

    border: '#332B47',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
  radii: {
    sm: '6px',
    md: '12px',
    pill: '999px',
  },
  fontSizes: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '2rem',
  },
} as const;

export type AppTheme = typeof theme;
export default theme;