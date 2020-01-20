import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks";

import { FETCH_CATEGORIES_QUERY } from "../../../util/graphql";

import { Form, Button } from "semantic-ui-react";

const CategoryAddForm = ({ setOpen }) => {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createCategoryCallback, {
    name: "",
    description: ""
  });

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY_MUTATION, {
    variables: values,
    update(cache, result) {
      setOpen(false);
      const data = cache.readQuery({
        query: FETCH_CATEGORIES_QUERY
      });

      const newCategory = result.data.createCategory;
      cache.writeQuery({
        query: FETCH_CATEGORIES_QUERY,
        data: { categories: [newCategory, ...data.categories] }
      });

      values.name = "";
      values.description = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  function createCategoryCallback() {
    createCategory();
  }

  return (
    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <Form.Input
        label="Name"
        name="name"
        type="text"
        placeholder="Enter category name"
        value={values.name}
        onChange={onChange}
        error={
          errors.name
            ? {
                content: "Name must not be empty",
                pointing: "below"
              }
            : false
        }
      />
      <Form.TextArea
        label="Description"
        name="description"
        type="text"
        placeholder="Enter description"
        value={values.description}
        onChange={onChange}
        error={
          errors.description
            ? {
                content: "Description must not be empty",
                pointing: "below"
              }
            : false
        }
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};

const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!, $description: String) {
    createCategory(categoryInput: { name: $name, description: $description }) {
      _id
      name
      description
      photo
    }
  }
`;
export default CategoryAddForm;
