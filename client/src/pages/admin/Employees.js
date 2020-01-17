import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_QUERY } from "../../util/graphql";

import Layout from "../../components/admin/Layout";
import EmployeeCard from "../../components/admin/employee/EmployeeCard";
import NewEmployee from "../../components/admin/employee/NewEmployee";

import { Grid, Header, Dimmer, Loader, Segment } from "semantic-ui-react";
import "../../components/admin/css/header.css";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const { loading, data } = useQuery(FETCH_EMPLOYEES_QUERY);

  useEffect(() => {
    if (data) {
      setEmployees(data.employees);
    }
  }, [data]);

  return (
    <Layout>
      <div className="container-content">
        <Segment style={{ height: "18vh" }}>
          <Header block size="huge">
            Employees
          </Header>
          <NewEmployee />
        </Segment>

        <Grid columns={3} stackable>
          <Grid.Row>
            {loading ? (
              <Dimmer active inverted>
                <Loader>Loading</Loader>
              </Dimmer>
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
