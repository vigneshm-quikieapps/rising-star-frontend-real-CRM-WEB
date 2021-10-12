import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

const StyledCheckIcon = styled(CheckIcon)({
  width: "18px",
  height: "18px",
  color: "#fff",
});

const CheckboxStyled = (props) => {
  const { checked, setChecked } = props;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        checkedIcon={<StyledCheckIcon />}
        sx={{
          width: "29px",
          height: "27px",
          borderRadius: "8px",
          border: "2px solid #aaaaaa",
          color: "transparent",
          "&.Mui-checked": {
            color: "#fff",
            border: "2px solid #aaaaaa00",
            backgroundImage: "linear-gradient(133deg, #ff1a6d, #ff6e2d 100%)",
          },
        }}
      />
    </>
  );
};

export default CheckboxStyled;
