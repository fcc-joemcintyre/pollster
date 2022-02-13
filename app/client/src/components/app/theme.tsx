import { createTheme } from '@mui/material';

export function getTheme (name) {
  return createTheme ({
    palette: {
      mode: name === 'dark' ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Roboto,sans-serif',
      h1: {
        fontSize: '1.5rem',
      },
      h2: {
        fontSize: '1.3rem',
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'outlined',
          disableRipple: true,
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
    },
  });
}
