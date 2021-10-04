# Instructions

## Prerequisites you need to know or learn

- Material-UI v5
- React-redux & redux-saga
- Formik & YUP

## Code style

- Fit code and comments within 80 chars per line
- Use 2 spaces for indentation
- Use double quotes

## Project Structure

- assets: Put images, fonts and other assets here
- components: Put common stateless components here
- containers: Put stateful components here
- helper: Put reusable constant variables here (example: tab names)

```js
const tabs = ["class definition", "enrollment", "attendence", "payments"];
```

- hoc: Used for Higher Order Components (example: main-layout)
- redux: All the redux logic
- router: All the app routes are mentioned here
- styles: Theme is placed here (don't change it, contact Abbas or Prahalad if you need a global style to be included)
- utils: API SDK, validators or any other utility

## Styling

We are going to use the internal [styled][1] function of material-ui which has
access to the [theme](https://mui.com/customization/theming/) object and the component props, so we're using inline
styling for every component and you should not import any stylesheets in your
components.

MUI almost has all the components required in this project which you can
customize using the [styled][1] function mentioned above, so try to use
Material-UI pre-built components whenever possible especially
for [Typography][2].

Read the `material-ui` v5 [documentation][3] if you are not familiar with MUI
yet

`styled` basic usage:

```jsx
import * as React from "react";
import { styled } from "@mui/system";

const MyComponent = styled("div")({
  color: "darkslategray",
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
});

export default function BasicUsage() {
  return <MyComponent>Styled div</MyComponent>;
}
```

`styled` accessing the theme:

```jsx
const MyThemeComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));
```

`styled` advanced usage (accessing the theme and component props):

```jsx
import { styled } from "@mui/material/styles";

const SpanWithPopup = styled("span", {
  // return false for props that shouldn't be passed to the underlying component
  shouldForwardProp: (prop) => ["color", "popupColor"].indexOf(prop) === -1,
})(({ theme }) => (props) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  color: props.color,
  "&::after": {
    content: "attr(data-title)",
    display: "block",
    position: "absolute",
    top: "100%",
    left: "50%",
    color: props.popupColor,
    whiteSpace: "nowrap",
    transform: "translate(-50%, 0)",
    padding: `0 ${theme.spacing(1)}`,
    marginTop: `${theme.spacing(0.5)}`,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    visibility: "hidden",
  },
  "&:hover, &:focus": {
    "&::after": {
      visibility: "visible",
    },
  },
}));
```

[1]: https://mui.com/system/styled/
[2]: https://mui.com/components/typography/
[3]: https://mui.com/getting-started/usage/
