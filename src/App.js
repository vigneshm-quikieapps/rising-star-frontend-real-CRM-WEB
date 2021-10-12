import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Provider } from 'react-redux';
import store from "./redux/store/configureStore";

function App() {
  return (
    <Provider store={store} >
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
    </ThemeProvider>
    </Provider>
  );
}

export default App;
