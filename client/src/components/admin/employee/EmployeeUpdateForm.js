import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../../../util/hooks";
import { Form, Button } from "semantic-ui-react";

const EmployeeUpdateForm = ({
  employee: { _id, firstName, lastName, empId, contact, email, role },
  setOpen
}) => {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(updateEmployeeCallback, {
    empId: empId,
    firstName: firstName,
    lastName: lastName,
    contact: contact,
    email: email,
    role: role
  });

  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
    variables: {
      _id: _id,
      empId: values.empId,
      firstName: values.firstName,
      lastName: values.lastName,
      contact: values.contact,
      email: values.email,
      role: values.role
    },
    update(_) {
      setOpen(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  function updateEmployeeCallback() {
    updateEmployee();
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
        />
        <Form.Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter last name"
          value={values.lastName}
          onChange={onChange}
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
      <Button type="submit">Update</Button>
    </Form>
  );
};

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation updateEmployee(
    $_id: ID!
    $empId: String
    $firstName: String
    $lastName: String
    $contact: String
    $email: String
    $role: String
  ) {
    updateEmployee(
      _id: $_id
      empId: $empId
      firstName: $firstName
      lastName: $lastName
      contact: $contact
      email: $email
      role: $role
    ) {
      _id
      empId
      firstName
      lastName
      contact
      email
      role
    }
  }
`;

export default EmployeeUpdateForm;
