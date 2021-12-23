import { Switch, Route, Redirect } from "react-router-dom";

// import ErrorBoundary from "../hoc/error-boundary";
import {
  Dashboard,
  Login,
  Classes,
  Members,
  SetupTerm,
  SetupPaymentUpload,
  NoMatch,
} from "../pages";

import MainLayout from "../hoc/main-layout";

const MainRouter = () => (
  <>
    {/* /// enable it for production */}
    {/* <ErrorBoundary> */}
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Redirect from="/setup" to="/setup/term" exact />
      <Route>
        <MainLayout>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/classes">
            <Classes />
          </Route>
          <Route path="/members">
            <Members />
          </Route>
          <Route path="/setup/term" exact>
            <SetupTerm />
          </Route>
          <Route path="/setup/paymentUpload" exact>
            <SetupPaymentUpload />
          </Route>
        </MainLayout>
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
    {/* </ErrorBoundary> */}
  </>
);

export default MainRouter;
