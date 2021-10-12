import { styled } from "@mui/material/styles";

const Main = styled("main", {
  shouldForwardProp: (prop) => ["open", "drawerWidth"].indexOf(prop) === -1,
})(({ theme, open, drawerWidth }) => ({
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

export default Main;
