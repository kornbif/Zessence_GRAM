import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_EMPLOYEES_QUERY } from "../../../util/graphql";
import { Button, Icon, Modal, Header } from "semantic-ui-react";

function DeleteButton({ employee: { _id, firstName, lastName }, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    update(cache) {
      setConfirmOpen(false);
      if (callback) {
        callback();
      }

      const data = cache.readQuery({
        query: FETCH_EMPLOYEES_QUERY
      });

      data.employees = data.employees.filter(emp => emp._id !== _id);

      cache.writeQuery({
        query: FETCH_EMPLOYEES_QUERY,
        data: { employees: [...data.employees] }
      });
    },
    variables: {
      _id
    }
  });

  const onConfirmDelete = () => {
    deleteEmployee();
  };
  const onCancelDelete = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
        style={{ margin: 0 }}
      >
        <Icon name="trash" />
        DELETE
      </Button>

      <Modal open={confirmOpen} basic size="tiny">
        <Header icon="archive" content="Delete Employee" />
        <Modal.Content>
          <p>
            Are you sure you want to delete&nbsp;
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                borderBottom: "1px solid  white"
              }}
            >
              {firstName} {lastName}
            </span>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={onCancelDelete}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={onConfirmDelete}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id)
  }
`;

export default DeleteButton;
