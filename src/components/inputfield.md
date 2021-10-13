# How to use inputfield ?

Firstly, import the inputfield from components folder.

```
import inputfield from "../components/inputfield"
```

Then, use the component like this

```
<InputFieldOne variant="outlined" label="age" />
```

to get outlined styled inputfield and for filled styled inputfield use code below.

```
<InputFieldOne
    variant="filled"
    InputProps={{ disableUnderline: true }}
    label="age"
/>
```

### NOTE : This input field can accept all the props provided by jsx like onChange, value, name etc.
