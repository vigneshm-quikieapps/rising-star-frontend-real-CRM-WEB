import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

const InputField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  width: "100%",
  borderRadius: 8,
  outline: "1px solid #e2e2e1",
  // "&::before": {
  //   border: "1px solid green",
  // },

  "& .Mui-focused::after": {
    content: '""',
    position: "absolute",
    height: "inherit",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "8px",
    border: "1px solid transparent" /*2*/,
    "-webkit-mask":
      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
    "-webkit-mask-composite": "destination-out" /*5'*/,
    "mask-composite": "exclude",
    background: theme.palette.gradients.diagonal,
  },
  "& .MuiFilledInput-root": {
    // overflow: "hidden",
    borderRadius: 8,

    backgroundColor: "white",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      border: "none",
      background: "white",
    },
  },
  "& label.Mui-focused": {
    "&::after": {
      border: "none",
      content: '""',
      background: "white",
    },
    color: "#ff1a6d",
    background: "inherit",
  },
}));

export default function InputFieldTwo(props) {
  const { label, ...otherProps } = props;
  return (
    <InputField label={label || "Hello"} variant="filled" {...otherProps} />
  );
}
