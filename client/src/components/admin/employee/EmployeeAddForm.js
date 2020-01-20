import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../../../util/hooks";
import { FETCH_EMPLOYEES_QUERY } from "../../../util/graphql";
import { Form, Button } from "semantic-ui-react";

function EmployeeAddForm({ setOpen }) {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createEmployeeCallback, {
    empId: "",
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    role: "AESTHETICIAN"
  });

  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
    variables: values,
    update(cache, result) {
      setOpen(false);
      const data = cache.readQuery({
        query: FETCH_EMPLOYEES_QUERY
      });

      const newEmployee = result.data.createEmployee;
      cache.writeQuery({
        query: FETCH_EMPLOYEES_QUERY,
        data: { employees: [newEmployee, ...data.employees] }
      });

      values.empId = "";
      values.firstName = "";
      values.lastName = "";
      values.contact = "";
      values.email = "";
      values.role = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  function createEmployeeCallback() {
    createEmployee();
  }

  return (
    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <Form.Group widths={16}>
        <Form.Input
          label="Employee ID"
          name="empId"
          type="text"
          placeholder="Enter employee id"
          onChange={onChange}
          value={values.empId}
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
      </Form.Group>
      <Form.Group widths="equal">
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
      </Form.Group>
      <Form.Group widths="equal">
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
        <div className="field">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            className="ui dropdown"
            onChange={onChange}
            value={values.role}
          >
            <option value="AESTHETICIAN">Aesthetician</option>
            <option value="RECEPTIONIST">Receptionist</option>
          </select>
        </div>
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
}

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation createEmployee(
    $empId: String!
    $firstName: String!
    $lastName: String!
    $contact: String
    $email: String!
    $role: String
  ) {
    createEmployee(
      empInput: {
        empId: $empId
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
