import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navigation from "../components/main/Navigation";
import Home from "./main/Home";
import Page404 from "./Page404";
function Main({ match }) {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path={`${match.path}`} component={Home} exact />
        <Route path={`${match.path}/home`} component={Home} />
        <Route path={`${match.path}/about`} component={Home} exact />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
}

export default Main;
