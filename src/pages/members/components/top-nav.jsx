import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { TabNav, IconButton, ImgIcon } from "../../../components";
import { backIcon } from "../../../assets/icons";
import { getMemberById } from "../../../redux/action/memberAction";

const TopNav = () => {
  const history = useHistory();
  const title = useSelector((state) => state.shared.pageTitle);
  const dispatch = useDispatch();
  const { id: memberId } = useParams();
  const pathTo = (path) => "/members/" + path + "/" + memberId;

  const items = [
    {
      id: 1,
      title: "Personal Info",
      to: pathTo("info"),
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
      title: "Consent Record",
      to: pathTo("consent"),
      exact: false,
    },
    {
      id: 4,
      title: "Evaluations",
      to: pathTo("evaluations"),
      exact: false,
    },
    {
      id: 5,
      title: "Finance Record",
      to: pathTo("finance"),
      exact: false,
    },
  ];

  useEffect(() => {
    dispatch(getMemberById(memberId));
  }, [dispatch, memberId]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <IconButton onClick={() => history.push("/members")}>
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
