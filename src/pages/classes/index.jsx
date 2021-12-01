import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import AddEdit from "./add-edit";
import Attendance from "./attendance";
import Definition from "./definition";
import Enrolments from "./enrolments";
import Payments from "./payments";
import ClassList from "./list";
import TopNav from "./components/top-nav";
import ClassInfo from "./components/class-info";
import NotFound from "../404";

const makePathArray = (match, ...paths) =>
  paths.map((path) => `${match}/${path}/:id`);

const Classes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route
        path={makePathArray(
          match.path,
          "add",
          "attendance",
          "definition",
          "enrolments",
          "payments",
        )}
        exact
      >
        <TopNav />
        <ClassInfo />
      </Route>
      <Switch>
        <Route path={`${match.path}/add/:id`} component={AddEdit} exact />
        <Route path={`${match.path}/add`} component={AddEdit} exact />
        <Route
          path={`${match.path}/attendance/:id`}
          component={Attendance}
          exact
        />
        <Route
          path={`${match.path}/definition/:id`}
          component={Definition}
          exact
        />
        <Route
          path={`${match.path}/enrolments/:id`}
          component={Enrolments}
          exact
        />
        <Route path={`${match.path}/payments/:id`} component={Payments} exact />
        <Route path={match.path} component={ClassList} exact />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Classes;
