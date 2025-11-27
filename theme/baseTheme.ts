'use client';

import { createTheme } from '@mui/material/styles';

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

const palette = {
  primary: {
    main: '#5D3A6C',
    light: '#8B6B9C',
    dark: '#4a2e56',
    contrastText: '#fff',
  },
  secondary: {
    main: '#D4A574',
    light: '#E5C5A0',
    dark: '#c69564',
    contrastText: '#2c3e50',
  },
  accent: {
    pink: '#ed5a9f', // Pink circle
    purple: '#9b7ddb', // Purple circle
    yellow: 'rgb(253, 206, 99)', // Yellow circle
  },
  background: {
    default: '#F5EDE3',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2C2C2C',
    secondary: '#5D3A6C',
  },
};

/** sageNavy - alternative palette for testing */
// const palette = {
//   primary: {
//     main: '#2C4251',
//     light: '#4a6170',
//     dark: '#1f2f3a',
//     contrastText: '#fff',
//   },
//   secondary: {
//     main: '#7A9B8E',
//     light: '#A8C5B9',
//     dark: '#6a8a7d',
//     contrastText: '#fff',
//   },
//   background: {
//     default: '#F7F9F8',
//     paper: '#FFFFFF',
//   },
//   text: {
//     primary: '#2C2C2C',
//     secondary: '#2C4251',
//   },
// };

export default createTheme({
  palette,
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '7rem',
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      '@media (max-width:1200px)': {
        fontSize: '5rem',
      },
      '@media (max-width:768px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '4.5rem',
      fontWeight: 900,
      lineHeight: 1.1,
      '@media (max-width:1200px)': {
        fontSize: '3.5rem',
      },
      '@media (max-width:768px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '4rem',
      fontWeight: 900,
      lineHeight: 1.1,
      '@media (max-width:1200px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '5.5rem',
      fontWeight: 900,
      lineHeight: 1.1,
      '@media (max-width:1200px)': {
        fontSize: '4rem',
      },
      '@media (max-width:768px)': {
        fontSize: '2.8rem',
      },
    },
    body1: {
      fontSize: '1.4rem',
      lineHeight: 1.7,
      '@media (max-width:768px)': {
        fontSize: '1.1rem',
      },
    },
    body2: {
      fontSize: '1.2rem',
      lineHeight: 1.7,
    },
  },
});
