import React from "react";
import { Card, Image, Button, Icon, Popup, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

function EmployeeCard({
  employee: { _id, firstName, lastName, email, contact, photo, role }
}) {
  const deleteEmployee = () => {
    console.log("deleted");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={
            photo === null
              ? "https://react.semantic-ui.com/images/avatar/large/molly.png"
              : photo
          }
        />
        <Card.Header>
          {lastName}, {firstName}
        </Card.Header>
        <Card.Meta>{contact === null ? "#contactNo" : contact}</Card.Meta>
        <Card.Meta>{email}</Card.Meta>
        <Card.Meta>{role}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button color="green" as={Link} to={`/zeadmin/employee/${_id}`}>
          <Icon name="eye" />
          View
        </Button>
        <Popup
          wide
          position="top center"
          trigger={
            <Button color="red" floated="right">
              <Icon name="trash" />
              Delete
            </Button>
          }
          on="click"
        >
          <Grid divided columns="equal">
            <Grid.Column>
              <Popup
                trigger={
                  <Button icon color="green" onClick={deleteEmployee}>
                    <Icon name="check circle outline" />
                  </Button>
                }
                content="Confirm to delete employee"
                position="top center"
                size="tiny"
                inverted
              />
            </Grid.Column>
            <Grid.Column>
              <Popup
                trigger={
                  <Button icon color="red">
                    <Icon name="ban" />
                  </Button>
                }
                content="Cancel"
                position="top center"
                size="tiny"
                inverted
              />
            </Grid.Column>
          </Grid>
        </Popup>
      </Card.Content>
    </Card>
  );
}

export default EmployeeCard;
