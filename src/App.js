import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

import ClassesDefinition from "./pages/classes-definition";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <ClassesDefinition />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
