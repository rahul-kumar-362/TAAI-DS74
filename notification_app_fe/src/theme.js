import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f5f5b",
      dark: "#173f3d"
    },
    secondary: {
      main: "#bf4a30"
    },
    background: {
      default: "#f6f8f7",
      paper: "#ffffff"
    },
    text: {
      primary: "#17211f",
      secondary: "#5b6865"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 800
    },
    h5: {
      fontWeight: 800
    },
    h6: {
      fontWeight: 700
    },
    button: {
      fontWeight: 700,
      textTransform: "none"
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(23, 33, 31, 0.08)",
          boxShadow: "0 10px 30px rgba(25, 44, 40, 0.07)"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

export default theme;
