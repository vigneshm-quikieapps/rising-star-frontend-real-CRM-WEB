import { FormControl as MuiFormControl } from "@mui/material";
import { Select as MuiSelect } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { FilledInput } from "@mui/material";

const style1 = (theme) => {
  return {
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
      borderRadius: "8px",
      border: "1px solid transparent" /*2*/,
      "-webkit-mask":
        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
      "-webkit-mask-composite": "destination-out" /*5'*/,
      "mask-composite": "exclude",
      background: theme.palette.gradients.diagonal,
    },
    "& .MuiFilledInput-root": {
      borderRadius: 8,

      backgroundColor: "white",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&::before": {
        border: "none",
      },
      "&:hover": {
        backgroundColor: "transparent",
        "&::before": {
          border: "none",
        },
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
  };
};

export const FormControl = styled(MuiFormControl)(({ theme, variant }) =>
  variant === "outlined" ? style1(theme) : style2(theme)
);

const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: 20,
      height: "auto",
    },
  },
};

const CustomSelect = styled(MuiSelect)({});
CustomSelect.defaultProps = {
  MenuProps,
};

export { CustomSelect as Select };
