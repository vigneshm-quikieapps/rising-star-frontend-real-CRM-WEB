import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Main = styled("main", {
  shouldForwardProp: (prop) => ["open", "drawerWidth"].indexOf(prop) === -1,
})(({ theme, open, drawerWidth }) => ({
  // padding: theme.spacing(3),
  // maxWidth: 880,
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

const MainRoot = ({ children, drawerWidth, open }) => (
  <Main drawerWidth={drawerWidth} open={open}>
    <Box
      sx={{
        maxWidth: { xs: "100%", lg: "1040px" },
        mx: { xs: "16px", md: "32px", lg: "auto" },
      }}
    >
      {children}
    </Box>
  </Main>
);

export default MainRoot;
