import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  Dashboard,
  Login,
  Classes,
  ClassDefinitions,
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
      <Route path="/" exact>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </Route>
      <Route path="/classes" exact>
        <MainLayout>
          <Classes />
        </MainLayout>
      </Route>
      <Route path="/classes/definitions/:id" exact>
        <MainLayout>
          <ClassDefinitions />
        </MainLayout>
      </Route>
      <Route path="/classes/enrolments/:id" exact>
        <MainLayout>
          <ClassEnrolments />
        </MainLayout>
      </Route>
      <Route path="/classes/attendance/:id" exact>
        <MainLayout>
          <ClassAttendance />
        </MainLayout>
      </Route>
      <Route path="/classes/payments/:id" exact>
        <MainLayout>
          <ClassPayments />
        </MainLayout>
      </Route>
      <Route path="/classes/add/:id" exact>
        <MainLayout>
          <ClassAddEdit />
        </MainLayout>
      </Route>
      <Route path="/members" exact>
        <MainLayout>
          <Members />
        </MainLayout>
      </Route>
      <Route path="/members/info/:id" exact>
        <MainLayout>
          <MembersInfo />
        </MainLayout>
      </Route>
      <Route path="/members/enrolments/:id" exact>
        <MainLayout>
          <MembersEnrollments />
        </MainLayout>
      </Route>
      <Route path="/members/consent/:id" exact>
        <MainLayout>
          <MembersConsent />
        </MainLayout>
      </Route>
      <Route path="/members/evaluations/:id" exact>
        <MainLayout>
          <MembersEvaluations />
        </MainLayout>
      </Route>
      <Route path="/members/finance/:id" exact>
        <MainLayout>
          <MembersFinance />
        </MainLayout>
      </Route>
      <Redirect from="/setup" to="/setup/term" exact />
      <Route path="/setup/term" exact>
        <MainLayout>
          <SetupTerm />
        </MainLayout>
      </Route>
      <Route path="/setup/paymentUpload" exact>
        <MainLayout>
          <SetupPaymentUpload />
        </MainLayout>
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
