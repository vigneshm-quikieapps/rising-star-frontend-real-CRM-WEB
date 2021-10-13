import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { FormControl, Select } from "./components/dropDown";
import { MenuItem, InputLabel } from "@mui/material";
import React from "react";

function App() {
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <FormControl variant="filled">
        <InputLabel>Age</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={age}
          onChange={handleChange}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              awesome
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}

export default App;
