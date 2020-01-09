import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import Appointments from "./admin/Appointments";
import Employees from "./admin/Employees";
import Employee from "./admin/Employee";
import Login from "./admin/Login";
import PrivateRoute from "../util/PrivateRoute";
import AuthRoute from "../util/AuthRoute";
function Admin() {
  return (
    <Router>
      <Switch>
        <Redirect from="/zeadmin" to="/zeadmin/login" exact />
        <AuthRoute path="/zeadmin/login" component={Login} />
        <PrivateRoute path="/zeadmin/dashboard" component={Dashboard} />
        <PrivateRoute path="/zeadmin/appointments" component={Appointments} />
        <PrivateRoute path="/zeadmin/employees" component={Employees} />
        <PrivateRoute path="/zeadmin/employee" component={Employee} />
      </Switch>
    </Router>
  );
}

export default Admin;
