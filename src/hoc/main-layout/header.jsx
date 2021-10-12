import { cloneElement } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { MenuOutlined as MenuIcon } from "@mui/icons-material";

import Notifications from "../../components/notifications";

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

const Header = ({ handleDrawerOpen, open, drawerWidth, ...otherProps }) => (
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
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }} />
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
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <Toolbar />
  </>
);

export default Header;
