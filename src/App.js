import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Dropdown from "./components/Dropdown"
import  IconButton from './components/IconButton'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';



function App() {
const a=<AccountBalanceIcon/>

  return (
    <ThemeProvider theme={theme}>
      <IconButton label={a}/>
    </ThemeProvider>
  );
}

export default App;



