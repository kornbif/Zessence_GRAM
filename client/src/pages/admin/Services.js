import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../components/admin/Layout";

import { Grid, Card, Image, Icon, Button } from "semantic-ui-react";

const Services = () => {
  return (
    <Layout>
      <Grid columns={3} stackable>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Image
                src="https://www.sanctuarysalondayspa.com/wp-content/uploads/2019/08/customized-facial.jpg"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>Facial Treatment</Card.Header>
                <Card.Description>
                  Daniel is a comedian living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color="green">
                  <Icon name="eye" />
                  Services
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>FACIAL</Card>
          </Grid.Column>
          <Grid.Column>
            <Card>FACIAL</Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Services;
