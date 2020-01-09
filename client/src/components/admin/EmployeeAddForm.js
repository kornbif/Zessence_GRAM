import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Form, Button } from "semantic-ui-react";

import { useForm } from "../../util/hooks";
import { FETCH_EMPLOYEES_QUERY } from "../../util/graphql";

function EmployeeAddForm() {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createEmployeeCallback, {
    employeeId: "",
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    role: ""
  });

  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_EMPLOYEES_QUERY
      });
      console.log(data);

      data.employees = [result.data.createEmployee, ...data.employees];
      proxy.writeQuery({ query: FETCH_EMPLOYEES_QUERY, data });

      values.employeeId = "";
      values.firstName = "";
      values.lastName = "";
      values.contact = "";
      values.email = "";
      values.role = "";
    },
    variables: values
  });

  function createEmployeeCallback() {
    createEmployee();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create new Admin</h2>
      <Form.Input
        label="Employee ID"
        name="employeeId"
        type="text"
        placeholder="Enter employee id"
        value={values.employeeId}
        onChange={onChange}
        error={
          errors.empId
            ? {
                content: "Employee ID must not be empty",
                pointing: "below"
              }
            : errors.existEmp
            ? {
                content: "This employee ID already exist",
                pointing: "below"
              }
            : false
        }
      />
      <Form.Input
        label="First Name"
        name="firstName"
        type="text"
        placeholder="Enter first name"
        value={values.firstName}
        onChange={onChange}
        error={
          errors.firstName
            ? {
                content: "FirstName must not be empty",
                pointing: "below"
              }
            : false
        }
      />
      <Form.Input
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Enter last name"
        value={values.lastName}
        onChange={onChange}
        error={
          errors.lastName
            ? {
                content: "Last Name must not be empty",
                pointing: "below"
              }
            : false
        }
      />
      <Form.Input
        label="Contact #"
        name="contact"
        type="text"
        placeholder="Enter contact number"
        value={values.contact}
        onChange={onChange}
      />
      <Form.Input
        label="Email"
        name="email"
        type="text"
        placeholder="Enter email address"
        value={values.email}
        onChange={onChange}
        error={
          errors.email
            ? {
                content: "Email must not be empty",
                pointing: "below"
              }
            : errors.emailx
            ? {
                content: "Email not valid",
                pointing: "below"
              }
            : false
        }
      />
      <Form.Input
        label="Role"
        name="role"
        type="text"
        placeholder="Enter role"
        value={values.role}
        onChange={onChange}
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation createEmployee(
    $employeeId: String!
    $firstName: String!
    $lastName: String!
    $contact: String
    $email: String!
    $role: String
  ) {
    createEmployee(
      empInput: {
        empId: $employeeId
        firstName: $firstName
        lastName: $lastName
        contact: $contact
        email: $email
        role: $role
      }
    ) {
      _id
      empId
      firstName
      lastName
      contact
      email
      photo
      role
    }
  }
`;

export default EmployeeAddForm;
