import { ThemeProvider } from "@mui/material/styles";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import theme from "./styles/theme";
import Classes from "./containers/class-list";

function App() {
const a=<AccountBalanceIcon/>

  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <Classes />
    </ThemeProvider>
  );
}

export default App;



