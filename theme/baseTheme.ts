'use client';

import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#1e3a5f', // Navy blue (dark circle)
      light: '#2d4a6f',
      dark: '#0f2340',
    },
    secondary: {
      main: '#f5a847', // Golden yellow
      light: '#f7b965',
      dark: '#d89030',
    },
    accent: {
      pink: '#ed5a9f', // Pink circle
      purple: '#9b7ddb', // Purple circle
      yellow: 'rgb(253, 206, 99)', // Yellow circle
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      cream: '#f9e6b8', // Yellow banner sections
      gray: '#333333',
    },
    text: {
      primary: '#2d2d2d',
      secondary: '#5a5a5a',
      disabled: '#9e9e9e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '12px 32px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
});

// Extend the theme to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      pink: string;
      purple: string;
      yellow: string;
    };
  }
  interface PaletteOptions {
    accent?: {
      pink?: string;
      purple?: string;
      yellow?: string;
    };
  }
  interface TypeBackground {
    cream?: string;
    gray?: string;
  }
}
