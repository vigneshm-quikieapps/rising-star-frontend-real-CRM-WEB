import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";


const GradientButton = styled(Button)(({ theme }) => ({
  backgroundImage: theme.palette.gradients.horizontalLinear,
  color: "#fff",

  // 1=8px  2=16px
  padding: theme.spacing(1, 2),
  border: `1px solid ${theme.palette.highlight.main}`,
  borderRadius: theme.shape.borderRadius.ternary,
}));

export default GradientButton;
