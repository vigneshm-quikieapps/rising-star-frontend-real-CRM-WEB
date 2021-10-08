import { ThemeProvider } from "@mui/material/styles";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import theme from "./styles/theme";
import Classes from "./containers/class-list";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function App() {
  const a = <AccountBalanceIcon />;

  return (
    <ThemeProvider theme={theme}>
      <Classes />
    </ThemeProvider>
  );
}

export default App;
