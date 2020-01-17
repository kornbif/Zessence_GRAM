import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
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
          <Redirect from="/" to="/zessence" exact />
          <Route path="/zessence" component={Main} />
          <Route path="/zeadmin" component={Admin} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
