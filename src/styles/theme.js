import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "#f0292d" },
    ternary: { main: "#e9e7f1" },
    darkIndigo: { main: "#140a35" },
    success: { main: "#2acc7e" },
    warning: { main: "#eab900" },
    error: { main: "#f0292d" },
    highlight: { main: "#f2f1f6" },
    text: {
      primary: "#000",
      secondary: "#0007",
      ternary: "#fff",
      disabled: "#e9e7f1",
      navItem: "#fff7",
      navItemActive: "#fff",
    },
    gradients: {
      horizontalLinear: "linear-gradient(106deg, #ff1a6d, #ff6e2d 100%)",
      verticalLinear: "linear-gradient(171deg, #ff1a6d, #ff6e2d)",
      diagonal: "linear-gradient(133deg, #ff1a6d, #ff6e2d 100%);",
    },
  },
  shape: {
    borderRadius: {
      primary: "12px",
      secondary: "20px",
      ternary: "10px",
    },
  },
  typography: {
    fontFamily: "'Manrope', 'sans-serif'",
  },
});

export default theme;
