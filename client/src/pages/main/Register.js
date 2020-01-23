import React, { useState } from "react";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Form, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  RegisterCenter,
  RegisterFormContainer
} from "../../components/main/Register/Register.styled";
import { StyledContainer } from "../../components/main/StyledContainer.styled";

const Register = props => {
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerCallBack, {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { from } = props.location.state || {
    from: { pathname: "/zessence/login" }
  };

  const [register, { loading }] = useMutation(CREATE_USER_MUTATION, {
    update(_, result) {
      props.history.push(from);
      console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerCallBack() {
    register();
  }

  return (
    <StyledContainer>
      <RegisterCenter>
        <RegisterFormContainer>
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <h3>
              <Icon name="lock" /> Register new account
            </h3>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                placeholder="Enter your first name"
                type="text"
                name="firstName"
                error={
                  errors.firstName
                    ? {
                        content: "First Name must not be empty",
                        pointing: "below"
                      }
                    : false
                }
                value={values.firstName}
                onChange={onChange}
              />
              <Form.Input
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                name="lastName"
                error={
                  errors.lastName
                    ? {
                        content: "Last Name must not be empty",
                        pointing: "below"
                      }
                    : false
                }
                value={values.lastName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Contact Number"
                placeholder="contact number"
                type="text"
                name="contact"
                value={values.contact}
                onChange={onChange}
                error={
                  errors.contact
                    ? {
                        content: "Contact must not be empty",
                        pointing: "below"
                      }
                    : false
                }
              />
              <Form.Input
                icon="at"
                iconPosition="left"
                label="Email Address"
                placeholder="example@example.com"
                type="text"
                name="email"
                value={values.email}
                onChange={onChange}
                error={
                  errors.email
                    ? {
                        content: "Email must not be empty",
                        pointing: "below"
                      }
                    : errors.emailX
                    ? {
                        content: "Email must valid",
                        pointing: "below"
                      }
                    : false
                }
              />
            </Form.Group>

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
                  : false
              }
              value={values.password}
              onChange={onChange}
            />
            <Form.Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
              name="confirmPassword"
              error={
                errors.confirmPassword
                  ? {
                      content: "Password do not match",
                      pointing: "below"
                    }
                  : false
              }
              value={values.confirmPassword}
              onChange={onChange}
            />

            <Button type="submit" primary>
              Register
            </Button>
            <Link to="/zessence/login">
              Already have an account? Login here
              <Icon name="long arrow alternate right" />
            </Link>
          </Form>
        </RegisterFormContainer>
      </RegisterCenter>
    </StyledContainer>
  );
};

const CREATE_USER_MUTATION = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $contact: String
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        contact: $contact
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      _id
      firstName
      lastName
      email
      contact
      createdAt
    }
  }
`;

export default Register;
