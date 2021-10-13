import MainLayout from "./hoc/main-layout";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StyledTexField from "./components/input-field";
import StyledCheckbox from "./components/StyledCheckbox";
import "./styles/global.css";
import PersonalInfo from "./pages/personal-info";
import Output from "./components/output";
function App() {
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <PersonalInfo />
    </ThemeProvider>
  );
}

export default App;

{
  /* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Pay Month"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <StyledTexField variant="filled" {...params} />
          )}
        />
      </LocalizationProvider>
      <br />
      <br />
      <br />
      <br />
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
      <br />
      <br />
      <br />
      <br />
      <StyledCheckbox onChange={handleChange} checked={checked} /> */
}
