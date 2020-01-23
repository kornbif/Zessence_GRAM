import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import Appointments from "./admin/Appointments";
import Employees from "./admin/Employees";
import Employee from "./admin/Employee";
import Services from "./admin/Services";
import Service from "./admin/Service";
import Login from "./admin/Login";
import {PrivateRoute} from "../util/PrivateRoute";
import { AdminAuthRoute } from "../util/AuthRoute";
import Page404 from "./Page404";
function Admin() {
  return (
    <Router>
      <Switch>
        <Redirect from="/zeadmin" to="/zeadmin/login" exact />
        <AdminAuthRoute path="/zeadmin/login" component={Login} exact />
        <PrivateRoute exact path="/zeadmin/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/zeadmin/appointments"
          component={Appointments}
        />
        <PrivateRoute exact path="/zeadmin/employees" component={Employees} />
        <PrivateRoute
          exact
          path="/zeadmin/employee/:_id"
          component={Employee}
        />
        <PrivateRoute exact path="/zeadmin/services" component={Services} />
        <PrivateRoute exact path="/zeadmin/service/:_id" component={Service} />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
}

export default Admin;
