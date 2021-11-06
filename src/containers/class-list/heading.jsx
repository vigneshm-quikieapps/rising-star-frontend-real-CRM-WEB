import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

const AddButton = styled(Button)(({ theme }) => ({
  backgroundImage: theme.palette.gradients.diagonal,
  borderRadius: theme.shape.borderRadiuses.primary,
  color: "#fff",
  width: 52,
  minWidth: 52,
  height: 48,
  padding: 0,
  fontSize: 24,
}));

const ClassListHeading = ({ title, description, action }) => (
  <Box sx={{ display: "flex", px: "20px", pt: "20px" }}>
    <Box sx={{ flexGrow: 1 }}>
      <Typography fontSize="28px" fontWeight="Bold" sx={{ height: 38 }}>
        {title}
      </Typography>
      <Typography
        fontSize="12px"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        {description}
      </Typography>
    </Box>
    <AddButton variant="contained" onClick={action || (() => {})}>
      +
    </AddButton>
  </Box>
);

export default ClassListHeading;
