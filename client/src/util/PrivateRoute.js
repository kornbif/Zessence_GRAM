import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/zeadmin/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/zessence/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
