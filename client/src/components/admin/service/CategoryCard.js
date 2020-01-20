import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

const CategoryCard = ({ category: { _id, name, description } }) => {
  return (
    <Card raised fluid as={Link} to={`/zeadmin/service/${_id}`}>
      <Image
        src="https://www.sanctuarysalondayspa.com/wp-content/uploads/2019/08/customized-facial.jpg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CategoryCard;
