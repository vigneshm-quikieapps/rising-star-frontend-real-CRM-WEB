import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const InputField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .Mui-focused::after": {
    content: '""',
    position: "absolute",
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

  "& .MuiOutlinedInput-root": {
    outline: "none",
    "& fieldset": {
      borderColor: "grey",
      borderRadius: 8,
    },
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },

  "& label.Mui-focused": {
    "&::after": {
      border: "none",
      content: '""',
      background: "white",
    },

    padding: "0px 10px",
    color: "#ff1a6d",
    background: "white",
    letterSpacing: "0.9px",
  },
}));

export default function InputFieldOne(props) {
  const { label, ...otherProps } = props;
  return (
    <div>
      <InputField label={label} {...otherProps} />
    </div>
  );
}
