import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import {
  CategoryContainer,
  CategoryCard
} from "./AppointStyled/CategoryAppoint.styled";

import { Dimmer, Loader } from "semantic-ui-react";
const CategoryAppoint = ({ values, nextStep }) => {
  const [categories, setCategories] = useState([]);
  const { loading, data } = useQuery(FETCH_CATEGORIES_QUERY);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  const cont = event => {
    event.preventDefault();
    nextStep();
  };

  return (
    <CategoryContainer>
      {loading ? (
        <Dimmer>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        data.categories &&
        data.categories.map(category => (
          <CategoryCard key={category._id} onClick={cont}>
            {category.name}
          </CategoryCard>
        ))
      )}
    </CategoryContainer>
  );
};

const FETCH_CATEGORIES_QUERY = gql`
  {
    categories {
      _id
      name
      description
    }
  }
`;

export default CategoryAppoint;
