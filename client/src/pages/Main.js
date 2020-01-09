import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./main/Home";

function Main() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default Main;
