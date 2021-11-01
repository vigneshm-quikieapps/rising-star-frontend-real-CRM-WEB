import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const ClassDefinition = () => {
  const theClass = useSelector((state) => state.classes.class);
  const { name, about } = theClass;

  return (
    <>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.highlight.main}`,
          borderRadius: (theme) => theme.shape.borderRadiuses.secondary,
          p: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "28px" }}>
          {name}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {about}
        </Typography>
      </Box>
    </>
  );
};

export default ClassDefinition;
