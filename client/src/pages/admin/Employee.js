import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../components/admin/Layout";
import DeleteButton from "../../components/admin/employee/DeleteButton";
import NewSchedule from "../../components/admin/employee/NewSchedule";
import ScheduleEmployeeCard from "../../components/admin/employee/ScheduleEmployeeCard";
import UpdateEmployee from "../../components/admin/employee/UpdateEmployee";

import {
  Dimmer,
  Loader,
  Button,
  Grid,
  List,
  Image,
  Header,
  Label,
  Container,
  Icon
} from "semantic-ui-react";
import "../../components/admin/css/employee.css";

function Employee(props) {
  const employeeId = props.match.params._id;
  const [employee, setEmployee] = useState([]);
  const { data, loading } = useQuery(FETCH_EMPLOYEE_QUERY, {
    variables: {
      employeeId
    }
  });

  useEffect(() => {
    if (data) {
      setEmployee(data.employee);
    }
  }, [data]);

  const deleteEmployeeCallback = () => {
    props.history.push("/zeadmin/employees");
  };

  let employeeMarkup;
  if (!data) {
    employeeMarkup = (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  } else {
    const {
      _id,
      empId,
      firstName,
      lastName,
      contact,
      email,
      photo,
      role,
      schedule,
      services
    } = data.employee;

    employeeMarkup = (
      <Layout>
        <Grid celled stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                src={
                  photo
                    ? `${photo}`
                    : "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2" block textAlign="center">
                {firstName} {lastName}'s Info
              </Header>
              <List divided>
                <List.Item>
                  <Label horizontal>Employee ID</Label>
                  {empId}
                </List.Item>
                <List.Item>
                  <Label horizontal>First Name</Label>
                  {firstName}
                </List.Item>
                <List.Item>
                  <Label horizontal>Last Name</Label>
                  {lastName}
                </List.Item>
                <List.Item>
                  <Label horizontal>Role</Label>
                  {role}
                </List.Item>
                <List.Item>
                  <Label horizontal>Contact</Label>
                  {contact}
                </List.Item>
                <List.Item>
                  <Label horizontal>Email</Label>
                  {email}
                </List.Item>
                <UpdateEmployee employee={data.employee} />
                <NewSchedule employee={data.employee} />
              </List>
              <hr />

              <DeleteButton
                employee={data.employee}
                callback={deleteEmployeeCallback}
              />
            </Grid.Column>

            <Grid.Column width={7}>
              <Header as="h2" block textAlign="center">
                Service
              </Header>
              <Container>
                <List horizontal selection>
                  {loading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    services &&
                    services.map(service => (
                      <List.Item key={service._id}>
                        <Label>
                          {service.name} <Icon name="delete" />
                        </Label>
                      </List.Item>
                    ))
                  )}
                </List>
              </Container>
              <hr />
              <Button color="twitter" floated="right">
                <Icon name="add" />
                Add service
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Header as="h3" block>
            Schedule
          </Header>

          <Grid.Row columns={4}>
            {loading ? (
              <Dimmer>
                <Loader />
              </Dimmer>
            ) : (
              schedule &&
              schedule.map(sched => (
                <Grid.Column key={sched.id}>
                  <ScheduleEmployeeCard sched={sched} />
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
  return employeeMarkup;
}

const FETCH_EMPLOYEE_QUERY = gql`
  query($employeeId: ID!) {
    employee(_id: $employeeId) {
      _id
      empId
      firstName
      lastName
      contact
      email
      photo
      role
      services {
        _id
        name
        price
        duration
        description
        photo
      }
      certificates {
        id
        name
        photo
      }
      schedule {
        id
        date
        start
        break
      }
      createdAt
    }
  }
`;

export default Employee;
