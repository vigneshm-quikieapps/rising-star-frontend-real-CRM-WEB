import { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemButton,
} from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useEffect } from "react";

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "drawerWidth",
})(({ theme, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  color: theme.palette.text.navItem,
  backgroundColor: theme.palette.darkIndigo.main,
  "& .activeNavLink": {
    color: theme.palette.text.navItemActive,
  },
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "inherit",
    color: "inherit",
    border: "none",
    "& .Mui-disabled": { opacity: 1 },
  },
  "& .MuiListItemButton-root": { padding: theme.spacing(0.5) },
  "& .MuiListItem-root": { padding: theme.spacing(0.5), color: "inherit" },
  "& .MuiListItemIcon-root": {
    color: "inherit",
    minWidth: theme.spacing(5),
  },
  "& .MuiDivider-root": {
    borderColor: theme.palette.text.navItem,
  },
}));

const CloseButton = styled("button")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: "50%",
  display: "block",
  width: 6,
  height: 40,
  backgroundImage: theme.palette.gradients.verticalLinear,
  border: "none",
  borderRadius: 4,
  padding: 0,
  margin: 0,
  cursor: "pointer",
  zIndex: 1,
}));

const NestedList = ({ item }) => {
  const match = useRouteMatch({
    path: item.urlPath,
    sensitive: true,
  });
  const [open, setOpen] = useState(!!match);

  useEffect(() => setOpen(!!match), [match]);

  // const toggleOpen = (e) => {
  //   e.preventDefault();
  //   setOpen(!open);
  // };

  return (
    <>
      <ListItemButton
        sx={{ mb: 1 }}
        // onClick={toggleOpen}
        component={NavLink}
        to={item.urlPath || "#"}
        activeClassName="activeNavLink"
        disabled={item.disabled}
        exact={item.exact}
      >
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" sx={{ mb: 3 }}>
        <List sx={{ pl: 5 }} component="div" disablePadding>
          <ExtractedItems items={item.items} nested />
        </List>
      </Collapse>
    </>
  );
};

const ExtractedItems = ({ items, nested }) => {
  return items.map((item) => {
    if (!item.items) {
      return (
        <ListItemButton
          key={item.id}
          component={NavLink}
          to={item.urlPath}
          activeClassName="activeNavLink"
          sx={{ mb: (theme) => (nested ? 0 : theme.spacing(3)) }}
          disabled={item.disabled}
          exact={item.exact}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.title} />
        </ListItemButton>
      );
    } else {
      return <NestedList key={item.id} item={item} />;
    }
  });
};

const SideNav = ({ header, open, handleDrawerOpen, items, width }) => {
  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      drawerWidth={width}
    >
      {header}
      <List
        sx={{
          width: "100%",
          p: 2,
        }}
        component="nav"
      >
        <CloseButton onClick={() => handleDrawerOpen(false)} />
        {<ExtractedItems items={items} />}
      </List>
    </StyledDrawer>
  );
};

export default SideNav;
