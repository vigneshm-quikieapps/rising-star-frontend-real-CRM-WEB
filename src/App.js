import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
import "./styles/global.css";
import store from "./redux/store/configureStore";
import MainRouter from "./router";
import { UserProvider } from "./contexts/user-context";
import { ErrorDialogProvider } from "./contexts/error-context";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <ErrorDialogProvider>
              <UserProvider>
                <MainRouter />
              </UserProvider>
            </ErrorDialogProvider>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
