// import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Output from "./components/output";
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <Output title="postcode" description="36526" />
      <Output title="postcode" description="36526" variant="header" />
    </ThemeProvider>
  );
}

export default App;
