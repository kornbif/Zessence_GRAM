import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql";
import {
  Button,
  Modal,
  Header,
  Icon,
  Form,
  Dimmer,
  Loader
} from "semantic-ui-react";

const EmployeeServiceAddForm = ({ employeeId }) => {
  const [open, setOpen] = useState(false);

  const { loading, data } = useQuery(FETCH_SERVICES_QUERY);

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button color="twitter" floated="right" onClick={handleModalOpen}>
        <Icon name="add" />
        Add Service
      </Button>
      <Modal open={open} size="tiny">
        <Icon name="close" onClick={() => setOpen(false)} />
        <Header icon="archive" content="Add new service" />
        <Modal.Content>
          <Form>
            <select className="selection dropdown">
              {loading ? (
                <Dimmer>
                  <Loader></Loader>
                </Dimmer>
              ) : (
                data.services &&
                data.services.map(service => (
                  <option value={service.name}>{service.name}</option>
                ))
              )}
            </select>
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

const ADD_SERVICE_MUTATION = gql`
  mutation addService($employeeId: ID!, $serviceId: ID!) {
    addService(employeeId: $employeeId, serviceId: $serviceId) {
      _id
      name
    }
  }
`;

export default EmployeeServiceAddForm;
