import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  // applied to label of all variants
  "& label": {
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
  // applied to label of outlined variant
  "& .MuiInputLabel-outlined": {
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(0, 1),
  },
  // applied to InputBase (FormControl) of all variants
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    border: "1px solid #b3b3b3",
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.main,
      border: "1px solid transparent",
      backgroundImage: `linear-gradient(${theme.palette.background.main}, ${theme.palette.background.main}), ${theme.palette.gradients.horizontalLinear}`,
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
    },
  },
  // applied to InputBase (FormControl) of filled variant
  "& .MuiFilledInput-root": {
    backgroundColor: "#f4f4f4",
    "&::after ,::before": { display: "none" },
  },
  // applied to InputBase (FormControl) of outlined variant
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
  },
}));

StyledTextField.defaultProps = {
  // InputProps: { disableUnderline: true },
  SelectProps: {
    MenuProps: {
      sx: {
        mt: "10px",
        "& .MuiMenu-paper": {
          border: (theme) => `1px solid ${theme.palette.ternary.main}`,
          borderRadius: "10px",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.08)",
        },
        "& ul": {
          py: "10px",
          "& .MuiMenuItem-root": {
            p: "16px 20px",
            bgcolor: (theme) => theme.palette.background.main,
            "&:hover": {
              color: (theme) => theme.palette.secondary.main,
            },
            "&.Mui-selected": {
              bgcolor: (theme) => theme.palette.highlight.main,
            },
          },
        },
      },
    },
  },
};

export default StyledTextField;
