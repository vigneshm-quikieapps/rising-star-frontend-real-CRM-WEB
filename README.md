# instructions

## Prerequisites you need to know or learn
- Material-UI v5
- React-redux redux-saga
- Formik & YUP

## styling
We are going to use the internal `styled` function of material-ui which has access to the theme object like below, so we're using inline styling for every component and you should not import any stylesheets in your components

Read the `material-ui` v5 documentation if you are not familiar with MUI yet

```
import { styled } from "@material-ui/core/styles";

const styledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "&::after": {
    content: "''",
    padding: `0 ${theme.spacing(1)}`,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    visibility: "hidden"
  },
  "&:hover, &:focus": {
    "&::after": {
      visibility: "visible",
    },
  },
}));
```

## structure

- assets: Put images, fonts and other assets here
- components: Put common stateless components here
- containers: Put stateful components here
- helper: Put reusable constant variables here (example: tab names)

```
const tabs = [
    "class definition",
     "enrollment",
     "attendence",
     "payments",
     ]
```

- hoc: used for Higher Order Components (example: main-layout)
- redux: All the redux logic
- router: All the app routes are mentioned here
- styles: Theme is placed here (don't change it, contact Abbas or Prahalad if you need a global style to be included) 
- utils: API SDK, validators or any other utility