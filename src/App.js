import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { FormControl, Select } from "./components/dropDown";
import InputFieldOne from "./components/inputfield";
import { FilledInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
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
      {/* <InputFieldOne
        variant="filled"
        InputProps={{ disableUnderline: true }}
        label="age"
      />
      <InputFieldOne variant="outlined" label="age" /> */}

      <FormControl variant="filled">
        <InputLabel id="demo-customized-select-label">Age</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          // multiple
          value={age}
          onChange={handleChange}
          // input={
          //   <FilledInput
          //     // variant="filled"
          //     InputProps={{ disableUnderline: true }}
          //   />
          // }
          // renderValue={(selected) => selected.join(', ')}
        >
          {/* {names.map((name) => (
            <MenuItem key={name} value={name}>
              awesome
            </MenuItem>
          ))} */}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}

export default App;
