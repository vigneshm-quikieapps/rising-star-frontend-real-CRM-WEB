import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
import "./styles/global.css";
// import Classes from "./pages/classes";
// import PersonalInfo from "./pages/personal-info";
import Payment from "./pages/Payment";
// import Enrollment from "./pages/enrollment";
import AdvanceSearch from "./pages/advance-search"
import store from "./redux/store/configureStore";
import MainRouter from "./router";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <MainRouter /> */}
        <AdvanceSearch/>
        <Payment/>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
