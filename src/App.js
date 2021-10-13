import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import CustomizedAccordions from "./components/accordion";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomizedAccordions />
    </ThemeProvider>
  );
}

export default App;
