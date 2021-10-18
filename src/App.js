import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

import Classes from "./pages/classes";
import Members from "./pages/members";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route path="/classes">
              <Classes />
            </Route>
            <Route path="/members">
              <Members />
            </Route>
            {/* <Route path="/setup/:subPath">
              <Setup />
            </Route>
            <Route>
              <NoMatch />
            </Route> */}
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
