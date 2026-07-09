import { createTheme } from '@mui/material/styles';

/**
 * Tema MUI personalizado para Antigüedades Sthandier
 * Sigue los design tokens del sistema CSS en index.css
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:         '#D4A853',
      light:        '#E8C98A',
      dark:         '#A67C1F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:         '#5C3D1E',
      light:        '#7D5A35',
      dark:         '#3E2510',
      contrastText: '#FAF7F2',
    },
    background: {
      default: '#FAF7F2',
      paper:   '#FFFFFF',
    },
    text: {
      primary:   '#1C1714',
      secondary: '#5C3D1E',
      disabled:  '#A67B52',
    },
    divider: '#E8D5C0',
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h5: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.75,
      fontSize: '1rem',
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.65,
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.75rem',
      letterSpacing: '0.08em',
    },
  },

  shape: {
    borderRadius: 12,
  },

  shadows: [
    'none',
    '0 1px 3px rgba(28,23,20,0.08)',
    '0 2px 8px rgba(28,23,20,0.10)',
    '0 4px 16px rgba(28,23,20,0.12)',
    '0 8px 24px rgba(28,23,20,0.14)',
    '0 12px 32px rgba(28,23,20,0.15)',
    '0 16px 40px rgba(28,23,20,0.16)',
    '0 20px 48px rgba(28,23,20,0.17)',
    '0 24px 56px rgba(28,23,20,0.18)',
    '0 28px 64px rgba(28,23,20,0.19)',
    '0 32px 72px rgba(28,23,20,0.20)',
    ...Array(14).fill('none'),
  ],

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '10px 28px',
          fontWeight: 600,
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: '0 4px 16px rgba(212,168,83,0.30)',
          '&:hover': {
            boxShadow: '0 8px 28px rgba(212,168,83,0.45)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(28,23,20,0.10)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 48px rgba(28,23,20,0.16)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D4A853',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D4A853',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#A67C1F',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          '&:before': { display: 'none' },
          boxShadow: '0 2px 8px rgba(28,23,20,0.08)',
          border: '1px solid #E8D5C0',
          transition: 'all 0.25s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(28,23,20,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 0 24px 24px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(28,23,20,0.15)',
        },
      },
    },
  },
});

export default theme;
