import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a9ba8',
    },
    secondary: {
      main: '#1f1f1f',
    },
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    error: {
      main: '#ff000d',
    },
    warning: {
      main: '#ffea00',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    }
  }
});

theme = createTheme(theme, {
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          [theme.breakpoints.down("sm")]: {
            fontSize: "3rem"
          }
        }
      }
    }
  }
});

export default theme;