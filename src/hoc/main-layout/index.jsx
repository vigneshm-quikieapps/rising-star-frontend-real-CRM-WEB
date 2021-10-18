import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import SideNav from "./side-nav";
import Main from "./main";

import { navItems } from "../../helper/constants";

const drawerWidth = 192;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2, 1),
  justifyContent: "center",
}));

const NavHeader = (
  <>
    <DrawerHeader>
      <Typography
        component={Link}
        to="/"
        sx={{
          color: (theme) => theme.palette.text.navItemActive,
          textDecoration: "none",
        }}
      >
        Rising Stars
      </Typography>
    </DrawerHeader>
    <Divider />
  </>
);

const MainLayout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(true);
  const toggleNav = () => setNavOpen((open) => !open);

  return (
    <>
      <Header
        open={navOpen}
        drawerWidth={drawerWidth}
        userRole="Business Admin"
        userName="Carole Chimako"
        handleDrawerOpen={toggleNav}
      />
      <SideNav
        header={NavHeader}
        open={navOpen}
        handleDrawerOpen={setNavOpen}
        items={navItems}
        width={drawerWidth}
      />
      <Main drawerWidth={drawerWidth} open={navOpen}>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default MainLayout;
