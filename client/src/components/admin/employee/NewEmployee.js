import React, { useState } from "react";
import EmployeeAddForm from "./EmployeeAddForm";

import { Header, Button, Icon, Modal } from "semantic-ui-react";

const NewEmployee = () => {
  const [open, setOpen] = useState(false);
  const onClickModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button size="small" floated="right" onClick={onClickModal}>
        <Icon name="add" />
        Employee
      </Button>
      <Modal open={open} size={"small"}>
        <Icon name="close" onClick={() => setOpen(false)} />
        <Header icon="archive" content="Add new employee" />
        <Modal.Content>
          <EmployeeAddForm setOpen={setOpen} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default NewEmployee;
