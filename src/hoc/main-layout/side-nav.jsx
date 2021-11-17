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
  "& .MuiList-root": {
    paddingRight: 0,
  },
  "& .MuiListItemButton-root": {
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
  },
  "& .MuiListItem-root": { padding: theme.spacing(0.5), color: "inherit" },
  "& .MuiListItemIcon-root": {
    color: "inherit",
    minWidth: theme.spacing(5),
  },
  "& .MuiDivider-root": {
    borderColor: theme.palette.text.navItem,
  },
}));

const Indicator = styled("button")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: "0",
  display: "block",
  width: 6,
  height: 40,
  backgroundImage: theme.palette.gradients.verticalLinear,
  border: "none",
  borderRadius: 4,
  padding: 0,
  margin: 0,
  zIndex: 1,
}));

const NavItem = ({ id, urlPath, nested, disabled, exact, icon, title }) => {
  const match = useRouteMatch({
    path: urlPath,
    sensitive: true,
    exact: exact,
  });
  return (
    <ListItemButton
      key={id}
      component={NavLink}
      to={urlPath}
      activeClassName="activeNavLink"
      sx={{ mb: nested ? 0 : 3, pr: 2 }}
      disabled={disabled}
      exact={exact}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {match && <Indicator />}
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

const NestedList = ({ item }) => {
  const match = useRouteMatch({
    path: item.urlPath,
    sensitive: true,
  });
  const [open, setOpen] = useState(false);

  // useEffect(() => setOpen(!!match), [match]);

  const toggleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        sx={{ mb: 1 }}
        onClick={toggleOpen}
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
    // const { id, urlPath, exact, disabled, title, icon } = item;
    if (!item.items) {
      return <NavItem {...item} nested={nested} />;
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
        {<ExtractedItems items={items} />}
      </List>
    </StyledDrawer>
  );
};

export default SideNav;
