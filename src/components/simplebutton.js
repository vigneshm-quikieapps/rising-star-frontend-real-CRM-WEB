import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SimpleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  backgroundColor: active
    ? theme.palette.primary.highlight
    : theme.palette.white.error,
    padding: theme.spacing(1, 2),
//   height: "42px",
//   width: "213px",
  border: `1px solid ${theme.palette.highlight.main}`,
  borderRadius: theme.shape.borderRadius.ternary,
}));

export default SimpleButton;
