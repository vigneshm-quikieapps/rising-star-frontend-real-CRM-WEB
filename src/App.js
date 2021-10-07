import { ThemeProvider } from "@mui/material/styles";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import theme from "./styles/theme";
import Classes from "./containers/class-list";
import Dropdown from "./components/Dropdown";
import IconButton from "./components/IconButton";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function App() {
  const a = <AccountBalanceIcon />;

  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <IconButton label={a} />
    </ThemeProvider>
  );
}

export default App;
