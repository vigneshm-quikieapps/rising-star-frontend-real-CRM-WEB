import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import StyledCheckbox from "./components/StyledCheckbox";
import { useState } from "react";

function App() {
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledCheckbox onChange={handleChange} checked={checked} />

      {/* dry run your component inside here */}
    </ThemeProvider>
  );
}

export default App;
