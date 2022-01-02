import { styled } from "@mui/material/styles";
import { IconButton as MuiIconButton } from "@mui/material";

const IconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== "gradient",
})(({ theme, gradient }) => ({
  width: "48px",
  height: "48px",
  padding: "12px",
  borderRadius: theme.shape.borderRadiuses.primary,
  border: `solid 1px ${theme.palette.ternary.main}`,
  backgroundColor: theme.palette.background.main,
  backgroundImage: gradient ? theme.palette.gradients.diagonal : "none",
  color: gradient ? "#fff" : theme.palette.text.primary,
}));

export default IconButton;
