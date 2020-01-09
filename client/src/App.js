import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./context/auth";

import Main from "./pages/Main";
import Admin from "./pages/Admin";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/zeadmin" component={Admin} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
