import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";


const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "discard",
})(({ theme,discard }) => ({

  backgroundImage:discard? "#fff" : theme.palette.gradients.horizontalLinear,
  color:discard? "#ff2c60":"#fff",

  // 1=8px  2=16px
  padding: theme.spacing(1, 2),
  fontSize: theme.shape.borderRadius.secondary,
  border: `1px solid ${theme.palette.highlight.main}`,
  borderRadius: theme.shape.borderRadius.ternary,
}));

export default GradientButton;
