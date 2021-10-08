import { ThemeProvider } from "@mui/material/styles";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import theme from "./styles/theme";
import Classes from "./containers/class-list";
import Dropdown from "./components/Dropdown";
import IconButton from "./components/IconButton";
import TabComponent from "./components/TabComponent";
import CheckBox from "./components/CheckBox";
import InputFieldOne from "./components/InputFieldOne";
import InputFieldTwo from "./components/InputFieldTwo";
import Popup from "./components/PopOne";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function App() {
  const a = <AccountBalanceIcon />;

  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      {/* <IconButton label={a} /> */}
      {/* <Dropdown label="select country" /> */}
      {/* <TabComponent btnText="New Tab"/> */}
      {/* <CheckBox /> */}
      {/* <InputFieldOne /> */}
      {/* <InputFieldTwo /> */}
      {/* <Popup /> */}
      <Classes />
    </ThemeProvider>
  );
}

export default App;
