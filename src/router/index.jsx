import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  Dashboard,
  Login,
  Classes,
  ClassDefinition,
  ClassEnrolments,
  ClassAttendance,
  ClassPayments,
  ClassAddEdit,
  Members,
  MembersInfo,
  MembersEnrollments,
  MembersConsent,
  MembersEvaluations,
  MembersFinance,
  SetupTerm,
  SetupPaymentUpload,
  NoMatch,
} from "../pages";

import MainLayout from "../hoc/main-layout";

const MainRouter = () => (
  <BrowserRouter>
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
          <Route path="/classes" exact>
            <Classes />
          </Route>
          <Route path="/classes/definition/:id" exact>
            <ClassDefinition />
          </Route>
          <Route path="/classes/enrolments/:id" exact>
            <ClassEnrolments />
          </Route>
          <Route path="/classes/attendance/:id" exact>
            <ClassAttendance />
          </Route>
          <Route path="/classes/payments/:id" exact>
            <ClassPayments />
          </Route>
          <Route path="/classes/add/:id" exact>
            <ClassAddEdit />
          </Route>
          <Route path="/classes/add" exact>
            <ClassAddEdit />
          </Route>
          <Route path="/members" exact>
            <Members />
          </Route>
          <Route path="/members/info/:id" exact>
            <MembersInfo />
          </Route>
          <Route path="/members/enrolments/:id" exact>
            <MembersEnrollments />
          </Route>
          <Route path="/members/consent/:id" exact>
            <MembersConsent />
          </Route>
          <Route path="/members/evaluations/:id" exact>
            <MembersEvaluations />
          </Route>
          <Route path="/members/finance/:id" exact>
            <MembersFinance />
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
  </BrowserRouter>
);

export default MainRouter;
