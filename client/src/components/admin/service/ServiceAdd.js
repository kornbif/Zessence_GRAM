import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks";
import { Form, Modal, Button, Icon, Header } from "semantic-ui-react";

const ServiceAdd = ({ category: { _id } }) => {
  const [open, setOpen] = useState(false);

  const onClickModal = () => {
    setOpen(true);
  };

  const { values, onChange, onSubmit } = useForm(createServiceCallback, {
    name: "",
    price: "",
    duration: "",
    description: ""
  });

  const [createService, { loading }] = useMutation(CREATE_SERVICE_MUTATION, {
    variables: {
      name: values.name,
      description: values.description,
      price: parseFloat(values.price),
      duration: parseInt(values.duration),
      categoryId: _id,
      _id
    },
    update(cache, result) {
      setOpen(false);

      if (result) {
        window.location.reload();
      }

      values.name = "";
      values.description = "";
      values.duration = "";
      values.price = "";
    }
  });

  function createServiceCallback() {
    createService();
  }

  return (
    <>
      <Button basic color="blue" onClick={onClickModal}>
        <Icon name="add" />
        New Service
      </Button>
      <Modal open={open} size={"small"}>
        <Icon name="close" onClick={() => setOpen(false)} />
        <Header icon="archive" content="New Service" />
        <Modal.Content>
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <Form.Input
              label="Name"
              name="name"
              type="text"
              placeholder="Enter service name"
              value={values.name}
              onChange={onChange}
            />
            <Form.Input
              label="Price"
              name="price"
              type="text"
              placeholder="Enter Price"
              value={values.price}
              onChange={onChange}
            />
            <div className="field">
              <label htmlFor="duration">Duration</label>
              <select
                name="duration"
                className="ui dropdown"
                onChange={onChange}
                value={values.duration}
              >
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="90">90 Minutes</option>
                <option value="120">120 Minutes</option>
                <option value="150">150 Minutes</option>
                <option value="180">180 Minutes</option>
              </select>
            </div>

            <Form.TextArea
              label="Description"
              name="description"
              type="text"
              placeholder="Enter description"
              value={values.description}
              onChange={onChange}
            />
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

const CREATE_SERVICE_MUTATION = gql`
  mutation createService(
    $name: String!
    $price: Float!
    $duration: Int!
    $description: String
    $categoryId: ID!
  ) {
    createService(
      serviceInput: {
        name: $name
        price: $price
        duration: $duration
        description: $description
        category: $categoryId
      }
    ) {
      _id
      name
      duration
      price
      description
    }
  }
`;

export default ServiceAdd;
