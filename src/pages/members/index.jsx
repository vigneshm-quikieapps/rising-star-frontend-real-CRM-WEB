import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";

import Info from "./info";
import Enrollments from "./enrolments";
import Consent from "./consent";
import Evaluations from "./evaluations";
import Finance from "./finance";

const Members = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/info/:id`}>
        <Info />
      </Route>
      <Route path={`${match.url}/enrolments/:id`}>
        <Enrollments />
      </Route>
      <Route path={`${match.url}/consent/:id`}>
        <Consent />
      </Route>
      <Route path={`${match.url}/evaluations/:id`}>
        <Evaluations />
      </Route>
      <Route path={`${match.url}/finance/:id`}>
        <Finance />
      </Route>
      <Route>{"Members"}</Route>
    </Switch>
  );
};

export default Members;
