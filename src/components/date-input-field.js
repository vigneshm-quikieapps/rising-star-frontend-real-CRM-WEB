import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const StyledTexField = styled(TextField)(({ theme }) => ({
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
  "& .MuiFilledInput-root": {
    borderRadius: 8,
    backgroundColor: "white",
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

export default StyledTexField;
