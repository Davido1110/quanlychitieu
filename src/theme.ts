import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006241', // Starbucks green
      light: '#00754A',
      dark: '#004F35',
    },
    secondary: {
      main: '#D4E9E2', // Starbucks light green
      light: '#E8F3F0',
      dark: '#B8D5C8',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F7F7F7',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#006241',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#006241',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
          padding: '8px 24px',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

export default theme; 