import React, { useState, useContext } from "react";

import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import "./Auth.css";
import { Form, Button, Icon } from "semantic-ui-react";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginAdminCallBack, {
    employeeId: "",
    password: ""
  });

  const { from } = props.location.state || {
    from: { pathname: "/zeadmin/dashboard" }
  };

  const [loginAdmin, { loading }] = useMutation(LOGIN_ADMIN, {
    update(_, { data: { adminLogin: adminData } }) {
      context.login(adminData);
      props.history.push(from);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginAdminCallBack() {
    loginAdmin();
  }

  return (
    <div className="container-login">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="form-container">
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <h3>
              <Icon name="lock" /> Z&nbsp;Essence&nbsp;Administration
            </h3>

            <Form.Input
              label="Employee ID"
              placeholder="Employee ID"
              type="text"
              name="employeeId"
              error={
                errors.empId
                  ? {
                      content: "Employee ID must not be empty",
                      pointing: "below"
                    }
                  : errors.general
                  ? {
                      content: "Admin not found",
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
                  : errors.isNotEqual
                  ? {
                      content: "Invalid credential",
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
          </Form>
        </div>
      </div>
    </div>
  );
}

const LOGIN_ADMIN = gql`
  mutation adminLogin($employeeId: String!, $password: String!) {
    adminLogin(empId: $employeeId, password: $password) {
      _id
      token
      tokenExpiration
    }
  }
`;

export default Login;
