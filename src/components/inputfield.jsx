import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const style1 = (theme) => {
  return {
    width: "100%",
    borderRadius: "8px",
    "& .Mui-focused::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.spacing(1),
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
        borderColor: "#e2e2e1",
        borderRadius: theme.spacing(1),
      },
      "&:hover fieldset": {
        borderColor: "#e2e2e1",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },

    "& label.Mui-focused": {
      "&::after": {
        border: "none",
        content: '""',
        background: "#fff",
      },

      padding: "0px 10px",
      color: "#ff1a6d",
      background: "white",
      letterSpacing: "0.9px",
    },
  };
};

const style2 = (theme) => {
  return {
    width: "100%",
    borderRadius: 8,
    outline: "1px solid #e2e2e1",
    "& .Mui-focused::after": {
      content: '""',
      position: "absolute",
      height: "inherit",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.spacing(1),
      border: "1px solid transparent" /*2*/,
      "-webkit-mask":
        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
      "-webkit-mask-composite": "destination-out" /*5'*/,
      "mask-composite": "exclude",
      background: theme.palette.gradients.diagonal,
    },
    "& .MuiFilledInput-root": {
      borderRadius: theme.spacing(1),

      backgroundColor: theme.palette.text.disabled,
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: theme.palette.text.disabled,
      },
      "&.Mui-focused": {
        border: "none",
        background: "white",
      },
    },
    // "& label.Mui-focused": {
    //   "&::after": {
    //     border: "none",
    //     content: '""',
    //     background: "white",
    //   },
    //   color: "#ff1a6d",
    //   background: "inherit",
    // },
  };
};

const InputField = styled(TextField)(({ theme, variant }) =>
  variant === "outlined" ? style1(theme) : style2(theme)
);

export default InputField;
