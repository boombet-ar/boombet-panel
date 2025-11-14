import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

// Tus colores personalizados
const primaryGreen = '#41753B';
const secondaryGreen = '#35CA22';

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryGreen,
    },
    secondary: {
      main: secondaryGreen,
    },
    background: {
      default: grey[100], // Un gris muy claro para el fondo
      paper: '#ffffff',
    },
    success: {
      main: green[600],
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#2c3e50',
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#2c3e50',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.07)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: grey[50],
          '& .MuiTableCell-root': {
            fontWeight: 700,
            fontSize: '12px',
            textTransform: 'uppercase',
            color: grey[700],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${grey[200]}`,
        },
      },
    },
  },
});