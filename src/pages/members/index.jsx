import { Switch, Route, useRouteMatch } from "react-router-dom";

import AddEdit from "./add-edit";
import Consent from "./consent";
import Enrolments from "./enrolments";
import Evaluations from "./evaluations";
import Info from "./info";
import Finance from "./finance";
import MemberList from "./list";
import TopNav from "./components/top-nav";
import NotFound from "../404";
import AddEnrolment from "./add-enrolment";

const makePathArray = (match, ...paths) =>
  paths.map((path) => `${match}/${path}/:id`);

const Members = () => {
  const match = useRouteMatch();
  return (
    <>
      <Route
        path={makePathArray(
          match.path,
          "add",
          "consent",
          "enrolments",
          "evaluations",
          "finance",
          "info",
        )}
        exact
      >
        <TopNav />
      </Route>
      <Switch>
        <Route path={`${match.path}/add/:id`} component={AddEdit} exact />
        <Route path={`${match.path}/add`} component={AddEdit} exact />
        <Route path={`${match.path}/consent/:id`} component={Consent} exact />
        <Route
          path={`${match.path}/enrolments/:id`}
          component={Enrolments}
          exact
        />
        <Route
          path={`${match.path}/evaluations/:id`}
          component={Evaluations}
          exact
        />
        <Route path={`${match.path}/finance/:id`} component={Finance} exact />
        <Route path={`${match.path}/info/:id`} component={Info} exact />
        <Route path={match.path} component={MemberList} exact />
        <Route path={`/members/newEnrollment/:id`} component={AddEnrolment} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Members;
