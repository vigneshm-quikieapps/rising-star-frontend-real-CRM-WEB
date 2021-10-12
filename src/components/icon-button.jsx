import { styled } from "@mui/material/styles";
import { IconButton as MuiIconButton } from "@mui/material";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  width: "48px",
  height: "48px",
  padding: "12px",
  borderRadius: theme.shape.borderRadius.primary,
  border: `solid 1px ${theme.palette.ternary.main}`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));

export default IconButton;
