import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../components/main/Navigation";
import Home from "./main/Home";
import About from "./main/About";
import MyAccount from "./main/MyAccount";
import Register from "./main/Register";
import Login from "./main/Login";
import Appointment from "./main/Appointment";
import Page404 from "./Page404";
function Main({ match }) {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path={`${match.path}`} component={Home} exact />
        <Route path={`${match.path}/home`} component={Home} />
        <Route path={`${match.path}/about`} component={About} exact />
        <Route path={`${match.path}/register`} component={Register} exact />
        <Route path={`${match.path}/login`} component={Login} exact />
        <Route path={`${match.path}/myaccount`} component={MyAccount} exact />
        <Route
          path={`${match.path}/appointment`}
          component={Appointment}
          exact
        />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
}

export default Main;
