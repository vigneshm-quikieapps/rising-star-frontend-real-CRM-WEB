import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { getBusinessList } from "../../redux/action/businesses-actions";
import Header from "./header";
import Footer from "./footer";
import SideNav from "./side-nav";
import Main from "./main";
import { navItems } from "../../helper/constants";
import ErrorDialog from "./error-dialog";

const drawerWidth = 270;

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
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(true);
  const toggleNav = () => setNavOpen((open) => !open);

  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);

  return (
    <>
      <Header
        drawerOpen={navOpen}
        drawerWidth={drawerWidth}
        userRole="Business Admin"
        userName={localStorage.getItem("userName") || "Logged Out"}
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
