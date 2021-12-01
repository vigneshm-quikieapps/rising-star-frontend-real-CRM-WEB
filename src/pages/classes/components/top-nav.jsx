import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import { TabNav, IconButton, ImgIcon } from "../../../components";
import { backIcon } from "../../../assets/icons";

const TopNav = () => {
  const history = useHistory();
  const title = useSelector((state) => state.shared.pageTitle);
  const { id: classId } = useParams();
  const pathTo = (path) => "/classes/" + path + "/" + classId;

  const items = [
    {
      id: 1,
      title: "Definition",
      to: pathTo("definition"),
      exact: false,
    },
    {
      id: 2,
      title: "Enrolments",
      to: pathTo("enrolments"),
      exact: false,
    },
    {
      id: 3,
      title: "Attendance",
      to: pathTo("attendance"),
      exact: false,
    },
    {
      id: 4,
      title: "Payments",
      to: pathTo("payments"),
      exact: false,
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <IconButton onClick={() => history.push("/classes")}>
          <ImgIcon>{backIcon}</ImgIcon>
        </IconButton>
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "20px", ml: 1 }}
        >
          {title || "Title"}
        </Typography>
      </Box>
      <TabNav items={items} />
    </>
  );
};

export default TopNav;
