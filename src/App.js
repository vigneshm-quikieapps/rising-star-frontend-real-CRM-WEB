import { useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import TextField from "./components/textfield";
import { Box, MenuItem } from "@mui/material";
import DatePicker from "./components/date-picker";

function App() {
  const [date, setDate] = useState(null);

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  // const inputRef3 = useRef();
  return (
    <BrowserRouter>
      <MainLayout>
        {/* dry run your component inside here */}
        <TextField inputRef={inputRef1} variant="filled" label="some label" />
        <br />
        <br />
        <TextField inputRef={inputRef2} variant="outlined" label="some label" />
        <br />
        <br />
        <TextField
          select
          variant="filled"
          label="some label"
          sx={{ width: "300px" }}
          defaultValue="1"
          onChange={(e) => console.log(e.target.value)}
        >
          <MenuItem value="1">Some long value 1</MenuItem>
          <MenuItem value="2">Some long value 2</MenuItem>
          <MenuItem value="3">Some long value 3</MenuItem>
        </TextField>
        <br />
        <br />
        <DatePicker
          label="Example DatePicker"
          date={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
