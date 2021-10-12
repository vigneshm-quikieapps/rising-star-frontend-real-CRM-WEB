import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import CheckBox from "./components/CheckboxStyled";
import { useState } from "react";

function App() {
  const [checked, setChecked] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CheckBox checked={checked} setChecked={setChecked} />
      {/* dry run your component inside here */}
    </ThemeProvider>
  );
}

export default App;
