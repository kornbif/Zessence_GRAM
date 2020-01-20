import React, { useState, useContext } from "react";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { Form, Button, Icon } from "semantic-ui-react";

import "../../components/main/css/userAuth.css";

const Login = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    email: "",
    password: ""
  });

  const { from } = props.location.state || {
    from: { pathname: "/zessence/appointment" }
  };

  const [loginUser, { loading }] = useMutation(USER_LOGIN, {
    update(_, { data: { userLogin: userData } }) {
      context.login(userData);
      props.history.push(from);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className="user-login_container">
      <div className="user-login_left"></div>
      <div className="user-login_right">
        <div className="form-container">
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <h3>
              <Icon name="lock" /> LOGIN
            </h3>

            <Form.Input
              label="Email"
              placeholder="Email"
              type="text"
              name="email"
              error={
                errors.email
                  ? {
                      content: "Email must not be empty",
                      pointing: "below"
                    }
                  : errors.userX
                  ? {
                      content: "Email not found",
                      pointing: "below"
                    }
                  : errors.general
                  ? {
                      content: "Email/Password not correct",
                      pointing: "below"
                    }
                  : false
              }
              value={values.employeeId}
              onChange={onChange}
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              error={
                errors.password
                  ? {
                      content: "Password must not be empty",
                      pointing: "below"
                    }
                  : errors.general
                  ? {
                      content: "Email/Password not correct",
                      pointing: "below"
                    }
                  : false
              }
              value={values.password}
              onChange={onChange}
            />

            <Button type="submit" primary>
              Login
            </Button>
            <Link to="/zessence/register">
              Register for new Account
              <Icon name="long arrow alternate right" />
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      _id
      token
      tokenExpiration
    }
  }
`;

export default Login;
