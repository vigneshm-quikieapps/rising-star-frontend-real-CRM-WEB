import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import MemberEnrollment from "./pages/member-enrollments";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Login from "./pages/login-page";
import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <MainLayout> */}
        {/* dry run your component inside here */}
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
        {/* </MainLayout> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
