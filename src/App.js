import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import CalDate from "./components/calDate";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <CalDate />
    </ThemeProvider>
  );
}

export default App;
