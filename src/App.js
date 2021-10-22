import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
import "./styles/global.css";
import store from "./redux/store/configureStore";
import MainRouter from "./router";

import ClassesDefinition from "./pages/classes-definition";

function App() {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
=======
      <BrowserRouter>
        <MainLayout>
          <ClassesDefinition />
        </MainLayout>
      </BrowserRouter>
>>>>>>> b93bf161ea6967187c19fe64fb77ee7641a4b709
    </Provider>
  );
}

export default App;
