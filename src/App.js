import { Provider } from "react-redux";
<<<<<<< HEAD
import store from "./redux/store/configureStore";
import MemberEnrollment from "./pages/member-enrollments";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Login from "./pages/login-page";
import MainLayout from "./hoc/main-layout";
=======
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
>>>>>>> origin/development
import "./styles/global.css";
import store from "./redux/store/configureStore";
import MainRouter from "./router";

function App() {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <BrowserRouter>
        {/* <MainLayout> */}
        {/* dry run your component inside here */}
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
        {/* </MainLayout> */}
      </BrowserRouter>
=======
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
>>>>>>> origin/development
    </Provider>
  );
}

export default App;
