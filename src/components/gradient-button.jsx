import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const sizes = { normal: "16px", large: "20px" };

const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => ["invert", "size"].indexOf(prop) === -1,
})(({ theme, invert, size = "normal" }) => ({
  backgroundImage: invert ? "#fff" : theme.palette.gradients.horizontalLinear,
  color: invert ? "#ff2c60" : "#fff",
  height: "48px",
  padding: "0px 25px",
  fontSize: sizes[size],
  border: `1px solid ${theme.palette.highlight.main}`,
  borderRadius: theme.shape.borderRadiuses.ternary,
  textTransform: "none",
}));

export default GradientButton;
