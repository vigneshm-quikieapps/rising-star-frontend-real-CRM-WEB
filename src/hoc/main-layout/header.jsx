import { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  LinearProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

import IconButton from "../../components/icon-button";
import ImgIcon from "../../components/img-icon";
import Notifications from "../../components/notifications";
import menuIcon from "../../assets/icons/icon-menu.png";
import homeIcon from "../../assets/icons/icon-home.png";
import userIcon from "../../assets/icons/icon-user.png";
import { logout } from "../../redux/action/authAction";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    ["drawerOpen", "drawerWidth"].indexOf(prop) === -1,
})(({ theme, drawerOpen, drawerWidth }) => ({
  paddingRight: "100px",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
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
  drawerOpen,
  drawerWidth,
  userRole,
  userName,
  ...otherProps
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const loading = useSelector((state) => state.shared.loading);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <ElevationScroll {...otherProps}>
        <AppBar
          position="fixed"
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
          color="background"
        >
          <Toolbar disableGutters>
            {loading && (
              <LinearProgress
                sx={{ position: "absolute", width: "100%", left: 0, bottom: 0 }}
                color="primary"
              />
            )}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%",
                  mx: "100px",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                >
                  <ImgIcon>{menuIcon}</ImgIcon>
                </IconButton>
              </Box>
            </Box>
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
            <IconButton onClick={handleAvatarClick}>
              <ImgIcon>{userIcon}</ImgIcon>
            </IconButton>
            <Menu
              open={open}
              onClose={handleUserMenuClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                mt: 3,
                "& .MuiPaper-root": {
                  border: (theme) => `1px solid ${theme.palette.text.disabled}`,
                  borderRadius: (theme) => theme.shape.borderRadiuses.primary,
                  overflow: "visible",
                  "&::before": {
                    content: '" "',
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    borderWidth: 18,
                    borderStyle: "solid",
                    borderColor: (theme) =>
                      `transparent transparent ${theme.palette.text.disabled} transparent`,
                  },
                  "&::after": {
                    content: '" "',
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    borderWidth: 16,
                    borderStyle: "solid",
                    borderColor: "transparent transparent #fff transparent",
                  },
                },
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default Header;
