import { cloneElement } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import IconButton from "../../components/icon-button";
import ImgIcon from "../../components/img-icon";
import Notifications from "../../components/notifications";
import menuIcon from "../../assets/icons/icon-menu.png";
import homeIcon from "../../assets/icons/icon-home.png";
import userIcon from "../../assets/icons/icon-user.png";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => ["open", "drawerWidth"].indexOf(prop) === -1,
})(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = ({
  handleDrawerOpen,
  open,
  drawerWidth,
  userRole,
  userName,
  ...otherProps
}) => (
  <>
    <ElevationScroll {...otherProps}>
      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <ImgIcon>{menuIcon}</ImgIcon>
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <IconButton sx={{ mr: "20px" }} LinkComponent={Link} to="/">
            <ImgIcon>{homeIcon}</ImgIcon>
          </IconButton>
          <Notifications
            show={true}
            items={[
              "notification 1",
              "notification 2",
              "notification 3",
              "notification 4",
              "notification 5",
              "notification 6",
            ]}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              ml: "20px",
              mr: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {userRole}
            </Typography>
            <Typography>{userName}</Typography>
          </Box>
          <IconButton>
            <ImgIcon>{userIcon}</ImgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <Toolbar />
  </>
);

export default Header;
