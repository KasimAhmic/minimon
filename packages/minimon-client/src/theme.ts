import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: 5,
  },
  palette: {
    primary: {
      light: '#1976d2',
      main: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      light: '#9c27b0',
      main: '#ba68c8',
      dark: '#7b1fa2',
    },
    error: {
      light: '#d32f2f',
      main: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      light: '#ed6c02',
      main: '#ff9800',
      dark: '#e65100',
    },
    info: {
      light: '#0288d1',
      main: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      light: '#2e7d32',
      main: '#03a9f4',
      dark: '#01579b',
    },
  },
};

export const lightTheme = createTheme(
  {
    palette: {
      mode: 'light',
      background: {
        paper: '#ffffff',
        default: '#fafafa',
      },
    },
  },
  baseThemeOptions,
);

export const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark',
    },
  },
  baseThemeOptions,
);
