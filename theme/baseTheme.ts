'use client';

import { createTheme } from '@mui/material/styles';

// Extend the theme to include custom colors and typography variants
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
  interface TypographyVariants {
    title1: React.CSSProperties | object;
    title2: React.CSSProperties | object;
    title3: React.CSSProperties | object;
    title4: React.CSSProperties | object;
    title5: React.CSSProperties | object;
  }
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties | object;
    title2?: React.CSSProperties | object;
    title3?: React.CSSProperties | object;
    title4?: React.CSSProperties | object;
    title5?: React.CSSProperties | object;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
    title3: true;
    title4: true;
    title5: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    cta: true;
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
    // main: '#D4A574',
    main: '#eac47c',
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
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'cta' },
          style: {
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '30px',
            px: 4,
            py: 1,
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            },
          },
          //  {
          //   backgroundColor: '#1e1e1e',
          //   color: '#ffffff',
          //   padding: '1rem 2.5rem',
          //   fontSize: '0.875rem',
          //   fontWeight: 600,
          //   letterSpacing: '0.08em',
          //   textTransform: 'uppercase',
          //   border: 'none',
          //   transition: 'all 0.2s ease',
          //   '&:hover': {
          //     backgroundColor: '#2d2d2d',
          //     transform: 'translateY(-1px)',
          //     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          //   },
          // },
        },
      ],
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    // Display titles for hero sections and major headings
    title1: {
      fontSize: '7rem',
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      '@media (max-width:1200px)': {
        fontSize: '5rem',
      },
      '@media (max-width:900px)': {
        fontSize: '4rem',
      },
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
    },
    title2: {
      fontSize: '5.5rem',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '-0.025em',
      '@media (max-width:1200px)': {
        fontSize: '4.5rem',
      },
      '@media (max-width:900px)': {
        fontSize: '3.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    title3: {
      fontSize: '4.5rem',
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      '@media (max-width:1200px)': {
        fontSize: '3.75rem',
      },
      '@media (max-width:900px)': {
        fontSize: '3rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.25rem',
      },
    },
    title4: {
      fontSize: '4rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
      '@media (max-width:1200px)': {
        fontSize: '3.25rem',
      },
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    title5: {
      fontSize: '3.75rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
      '@media (max-width:1200px)': {
        fontSize: '3rem',
      },
      '@media (max-width:900px)': {
        fontSize: '2.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    // Standard headings for content hierarchy
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': {
        fontSize: '2.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:900px)': {
        fontSize: '2.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:900px)': {
        fontSize: '1.875rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:900px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:900px)': {
        fontSize: '1.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
  },
});
