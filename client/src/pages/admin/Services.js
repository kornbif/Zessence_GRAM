import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import Layout from "../../components/admin/Layout";
import { FETCH_CATEGORIES_QUERY } from "../../util/graphql";
import CategoryCard from "../../components/admin/service/CategoryCard";
import NewCategory from "../../components/admin/service/NewCategory";

import "../../components/admin/css/header.css";
import { Grid, Header, Container, Dimmer, Loader } from "semantic-ui-react";

const Services = () => {
  const [categories, setCategories] = useState([]);

  const { loading, data } = useQuery(FETCH_CATEGORIES_QUERY);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  return (
    <Layout>
      <div className="container-content">
        <Grid columns={3} stackable>
          <Container>
            <Header block as="h1">
              Service
            </Header>
            <NewCategory />
          </Container>

          <Grid.Row>
            {loading ? (
              <Dimmer>
                <Loader>Loading</Loader>
              </Dimmer>
            ) : (
              data.categories &&
              data.categories.map(category => (
                <Grid.Column key={category._id}>
                  <CategoryCard category={category} />
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
};

export default Services;
