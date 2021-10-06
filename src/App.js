import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Dropdown from "./components/Dropdown"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dropdown/>
    </ThemeProvider>
  );
}

export default App;
