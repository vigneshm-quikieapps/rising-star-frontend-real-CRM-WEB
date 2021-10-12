import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SimpleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" ||  "select",
  // shouldForwardProp: (prop) => prop !== "select",
})

(({ theme, active, select }) => 
   ({
  backgroundColor: active ? theme.palette.highlight.main : "#fff",
  padding: theme.spacing(1, 2),
  height: "42px",
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  width: "213px",
  border: select
    ? `1px solid  ${theme.palette.secondary.main}`
    : `1px solid ${theme.palette.highlight.main}`,

  borderRadius: theme.shape.borderRadius.ternary,
  fontSize: "16px",
})
);

export default SimpleButton;
