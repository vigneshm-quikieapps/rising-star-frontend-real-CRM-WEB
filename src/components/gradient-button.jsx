import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "discard",
})(({ theme, discard }) => ({
  backgroundImage: discard ? "#fff" : theme.palette.gradients.horizontalLinear,
  color: discard ? "#ff2c60" : "#fff",
  height: "48px",
  padding: "0px 25px",
  fontSize: theme.shape.borderRadiuses.secondary,
  border: `1px solid ${theme.palette.highlight.main}`,
  borderRadius: theme.shape.borderRadiuses.ternary,
}));

export default GradientButton;
