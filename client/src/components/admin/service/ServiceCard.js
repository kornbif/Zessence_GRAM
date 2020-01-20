import React from "react";

import { Card, Image, List, Label, Icon, Button } from "semantic-ui-react";
// import DeleteCategory from "./DeleteCategory";

const ServiceCard = ({
  service: { _id, name, price, duration, description, photo, employees }
}) => {
  return (
    <Card raised>
      <Label corner="right">
        <Icon name="delete" />
      </Label>
      <Image
        src="https://www.sanctuarysalondayspa.com/wp-content/uploads/2019/08/customized-facial.jpg"
        wrapped
        ui={false}
        size="small"
      />
      <Card.Content>
        <Card.Header textAlign="center">{name}</Card.Header>
        <Card.Meta>Php {price}</Card.Meta>
        <Card.Meta>{duration} minutes</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <h5>Employees</h5>
        <List horizontal>
          {employees &&
            employees.map(employee => (
              <List.Item key={employee._id}>
                <Label size="mini">
                  {employee.firstName} {employee.lastName}
                </Label>
              </List.Item>
            ))}
        </List>
      </Card.Content>
      <Card.Content extra>
        {/* <DeleteCategory serviceId={_id} /> */}
        <Button>Edit</Button>
      </Card.Content>
    </Card>
  );
};

export default ServiceCard;
