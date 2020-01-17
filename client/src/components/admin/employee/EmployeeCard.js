import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function EmployeeCard({
  employee: { _id, firstName, lastName, email, contact, photo, role }
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="tiny"
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
      </Card.Content>
    </Card>
  );
}

export default EmployeeCard;
