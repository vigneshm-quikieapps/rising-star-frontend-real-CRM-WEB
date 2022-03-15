import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useUserInfo } from "../../contexts/user-context";
import { getBusinessList } from "../../redux/action/businesses-actions";
import Header from "./header";
import Footer from "./footer";
import SideNav from "./side-nav";
import Main from "./main";
import logo from "../../assets/images/Logo.png";
import { navItems } from "../../helper/constants";
import ErrorDialog from "./error-dialog";

const drawerWidth = 270;

const DrawerHeader = styled(Link)(({ theme }) => ({
  margin: "0 auto 60px 16px",
  display: "flex",
  padding: theme.spacing(2, 1),
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-end",
  textDecoration: "none",
}));

const NavHeader = (
  <>
    <DrawerHeader to="/">
      <img
        src={logo}
        alt="Rising Starts Logo - Go to home page"
        width="133"
        height="32"
      />
      <Typography
        sx={{
          color: "#fff8",
          textDecoration: "none",
          fontSize: "11px",
        }}
      >
        Rising Stars
      </Typography>
    </DrawerHeader>
    {/* <Divider /> */}
  </>
);

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(true);
  const toggleNav = () => setNavOpen((open) => !open);
  const userInfo = useUserInfo();

  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);

  if (!userInfo) return null;

  return (
    <>
      <Header
        drawerOpen={navOpen}
        drawerWidth={drawerWidth}
        userRole="Business User"
        userName={userInfo?.name || "Logged Out"}
        handleDrawerOpen={toggleNav}
      />
      <SideNav
        header={NavHeader}
        open={navOpen}
        handleDrawerOpen={setNavOpen}
        items={navItems}
        width={drawerWidth}
      />
      <Main drawerWidth={drawerWidth} drawerOpen={navOpen}>
        {children}
      </Main>
      <ErrorDialog />
      <Footer />
    </>
  );
};

export default MainLayout;
