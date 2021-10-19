import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
import "./styles/global.css";
import Classes from "./pages/classes";
import store from "./redux/store/configureStore";
import MainRouter from "./router";

function App() {
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
