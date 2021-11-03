import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
import "./styles/global.css";
import store from "./redux/store/configureStore";
import MainRouter from "./router";

function App() {
  if (
    ["/login", "/login/"].indexOf(window.location.pathname) < 0 &&
    !localStorage.getItem("accessToken")
  )
    window.location = "/login";

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
