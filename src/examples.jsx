import { useTheme } from "@mui/material/styles";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { TextField } from "./components";
import { menuSX } from "./components/textfield";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Multi = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState(["Oliver Hansen"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <TextField
      select
      SelectProps={{
        multiple: true,
        MenuProps: {
          sx: menuSX,
        },
      }}
      value={personName}
      sx={{ width: "30%", ml: "100px" }}
      onChange={handleChange}
    >
      {names.map((name) => (
        <MenuItem
          key={name}
          value={name}
          style={getStyles(name, personName, theme)}
        >
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Multi;
