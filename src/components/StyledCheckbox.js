import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

const StyledCheckIcon = styled(CheckIcon)({
  width: "18px",
  height: "18px",
  color: "#fff",
});

const CheckboxTheme = styled(Checkbox)(({ theme }) => {
  return {
    "&.Mui-checked": {
      backgroundImage: "linear-gradient(133deg, #ff1a6d, #ff6e2d 100%)",
      borderColor: "transparent !important",
    },
    "&.MuiCheckbox-root": {
      width: "30px",
      height: "28px",
      borderRadius: "8px",
      border: `1px solid ${theme.palette.checkbox.border}`,
      backgroundColor: theme.palette.checkbox.background,
      color: "transparent",
    },
  };
});

const StyledCheckbox = ({ ...rest }) => {
  return <CheckboxTheme checkedIcon={<StyledCheckIcon />} {...rest} />;
};

export default StyledCheckbox;
