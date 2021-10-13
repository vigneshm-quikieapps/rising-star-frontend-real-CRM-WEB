import MainLayout from "./hoc/main-layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import "./styles/global.css";
import { useState } from "react";
import StyledTexField from "./components/date-input-field";
import StyledCheckbox from "./components/StyledCheckbox";

function App() {
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Pay Month"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <StyledTexField variant="outlined" {...params} />
          )}
        />
      </LocalizationProvider>

      <StyledCheckbox onChange={handleChange} checked={checked} />

      {/* dry run your component inside here */}
    </ThemeProvider>
  );
}

export default App;

// for date picker
