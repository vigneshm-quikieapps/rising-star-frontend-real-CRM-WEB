import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const StyledTexField = styled(TextField)((props) => {
  const { theme, variant } = props;

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
      border: "1px solid transparent",
      "-webkit-mask":
        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
      "-webkit-mask-composite": "destination-out",
      "mask-composite": "exclude",
      background: theme.palette.gradients.diagonal,
    },
    "& .MuiFilledInput-root, & .MuiOutlinedInput-root": {
      borderRadius: 8,
      backgroundColor: "#f4f4f4",
      transition: "width 0s !important",
      "&:before": {
        borderBottomColor: "#00000000 !important",
        transition: "width 0s !important",
      },
      "&:after": {
        borderBottomColor: "#00000000 !important",
        transition: "width 0s !important",
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        border: "none",
        outline: "none",
        background: "white",
      },

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
    "& label": {
      padding: "0 5px",
      // background: variant == "outlined" ? "#f4f4f4" : "#fff",
    },
    "& label.Mui-focused": {
      "&::after": {
        border: "none",
        content: '""',
        background: "#fff",
        padding: "0 5px",
      },
      padding: "0 5px",
      background: "#fff",
      color: "#ff1a6d",
    },
  };
});

export default StyledTexField;
