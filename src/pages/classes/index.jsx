import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";

import ClassDefinitions from "./definitions";
import ClassEnrolments from "./enrolments";
import ClassAttendance from "./attendance";
import ClassPayments from "./payments";
import ClassAddEdit from "./add-edit";

const Classes = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/definitions/:id`}>
        <ClassDefinitions />
      </Route>
      <Route path={`${match.url}/enrolments/:id`}>
        <ClassEnrolments />
      </Route>
      <Route path={`${match.url}/attendance/:id`}>
        <ClassAttendance />
      </Route>
      <Route path={`${match.url}/payments/:id`}>
        <ClassPayments />
      </Route>
      <Route path={`${match.url}/add/:id`}>
        <ClassAddEdit />
      </Route>
      <Route>{"Classes"}</Route>
    </Switch>
  );
};

export default Classes;
