import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Layout from "../../components/admin/Layout";
import DeleteCategory from "../../components/admin/service/DeleteCategory";
import ServiceCard from "../../components/admin/service/ServiceCard";
import ServiceAdd from "../../components/admin/service/ServiceAdd";

import {
  Dimmer,
  Loader,
  Grid,
  List,
  Image,
  Header,
  Label,
  Button,
  Segment
} from "semantic-ui-react";

function Service(props) {
  const categoryId = props.match.params._id;
  const [category, setCategory] = useState([]);
  const { data, loading } = useQuery(FETCH_CATEGORY_QUERY, {
    variables: {
      categoryId
    }
  });

  useEffect(() => {
    if (data) {
      setCategory(data.category);
    }
  }, [data]);

  const deleteCategoryCallback = () => {
    props.history.push("/zeadmin/services");
  };

  let categoryMarkup;
  if (!data) {
    categoryMarkup = (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  } else {
    const { _id, name, description, photo, services } = data.category;

    categoryMarkup = (
      <Layout>
        <Segment>
          <Grid divided stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image
                  src={
                    photo
                      ? `${photo}`
                      : "https://www.sanctuarysalondayspa.com/wp-content/uploads/2019/08/customized-facial.jpg"
                  }
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <Header as="h2" block textAlign="center">
                  {name}'s Details
                </Header>
                <List divided>
                  <List.Item>
                    <Label horizontal>Category ID</Label>
                    {_id}
                  </List.Item>
                  <List.Item>
                    <Label horizontal>Name</Label>
                    {name}
                  </List.Item>
                  <List.Item>
                    <Label horizontal>Description</Label>
                    {description}
                  </List.Item>
                </List>
                <hr />
                <Button.Group>
                  <Button color="yellow" basic>
                    Update
                  </Button>
                  <ServiceAdd category={data.category} />
                </Button.Group>

                <DeleteCategory
                  category={data.category}
                  callback={deleteCategoryCallback}
                />
              </Grid.Column>
            </Grid.Row>
            <Header size="large">Services</Header>
            <Grid.Row columns={4}>
              {loading ? (
                <Dimmer>
                  <Loader />
                </Dimmer>
              ) : (
                services &&
                services.map(service => (
                  <Grid.Column key={service._id}>
                    <ServiceCard service={service} />
                  </Grid.Column>
                ))
              )}
            </Grid.Row>
          </Grid>
        </Segment>
      </Layout>
    );
  }
  return categoryMarkup;
}

const FETCH_CATEGORY_QUERY = gql`
  query($categoryId: ID!) {
    category(_id: $categoryId) {
      _id
      name
      description
      services {
        _id
        name
        price
        duration
        description
        photo
        employees {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export default Service;
