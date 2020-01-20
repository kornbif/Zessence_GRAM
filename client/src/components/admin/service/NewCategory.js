import React, { useState } from "react";
import CategoryAddForm from "./CategoryAddForm";
import { Header, Button, Icon, Modal } from "semantic-ui-react";

const NewCategory = () => {
  const [open, setOpen] = useState(false);

  const onClickModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        size="large"
        color="blue"
        basic
        floated="left"
        onClick={onClickModal}
      >
        <Icon name="add" />
        New Category
      </Button>
      <Modal open={open} size={"small"}>
        <Icon name="close" onClick={() => setOpen(false)} />
        <Header icon="archive" content="Add new category" />
        <Modal.Content>
          <CategoryAddForm setOpen={setOpen} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default NewCategory;
