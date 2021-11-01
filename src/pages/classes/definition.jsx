import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import TopNav from "./components/top-nav";
import { getClassById } from "../../redux/action/class-actions";

const ClassDefinition = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const theClass = useSelector((state) => state.classes.class);
  const businesses = useSelector((state) => state.businesses.businessList);
  const { name, about } = theClass;

  useEffect(() => {
    dispatch(getClassById(id));
  }, [dispatch, id]);

  return (
    <>
      <TopNav />
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
