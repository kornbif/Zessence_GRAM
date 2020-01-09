import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_EMPLOYEES_QUERY } from "../../util/graphql";
import Layout from "../../components/admin/Layout";
import EmployeeCard from "../../components/admin/EmployeeCard";
import EmployeeAddForm from "../../components/admin/EmployeeAddForm";

import { Grid, Header, Button, Icon, Modal } from "semantic-ui-react";

function Employee() {
  const { loading, data } = useQuery(FETCH_EMPLOYEES_QUERY);

  return (
    <Layout>
      <div className="container-content">
        <Header block size="huge">
          Employees
        </Header>
        <Modal
          trigger={
            <Button size="large" floated="right">
              <Icon name="add" />
              Employee
            </Button>
          }
          closeIcon
        >
          <Header icon="archive" content="Add new employee" />
          <Modal.Content>
            <EmployeeAddForm />
          </Modal.Content>
        </Modal>
        <Grid columns={2}>
          <Grid.Row>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              data.employees &&
              data.employees.map(employee => (
                <Grid.Column key={employee._id} style={{ marginBottom: 20 }}>
                  <EmployeeCard employee={employee} />
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
}

export default Employee;
