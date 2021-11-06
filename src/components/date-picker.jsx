import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import TextField from "./textfield";

export default function BasicDatePicker({
  label = "Select a date",
  date,
  onChange,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newValue) => {
          onChange && onChange(newValue);
        }}
        renderInput={(params) => <TextField variant="filled" {...params} />}
      />
    </LocalizationProvider>
  );
}
