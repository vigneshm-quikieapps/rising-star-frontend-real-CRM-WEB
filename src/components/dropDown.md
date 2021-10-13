# How to use dropDown component ?

First import this modules.

```
import { FormControl, Select } from "./components/dropDown";
```

then use the components like this

```
<FormControl variant="filled">
    <InputLabel id="demo-customized-select-label">Age</InputLabel>
    <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        value={age}
        onChange={handleChange}
    >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
</FormControl>
```

# Example

```
import { FormControl, Select } from "./components/dropDown";

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

  );
}
```
