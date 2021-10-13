import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import CustomAccordion from "./components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomAccordion />
    </ThemeProvider>
  );
}

export default App;
