import React, { useState } from "react";
import EmployeeUpdateForm from "./EmployeeUpdateForm";

import { Header, Button, Icon, Modal } from "semantic-ui-react";

const UpdateEmployee = ({ employee }) => {
  const [open, setOpen] = useState(false);

  const onClickModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button color="twitter" floated="left" onClick={onClickModal}>
        <Icon name="edit outline" />
        Update
      </Button>
      <Modal open={open} size={"small"}>
        <Icon name="close" onClick={() => setOpen(false)} />
        <Header
          icon="user"
          content={`Update ${employee.firstName} ${employee.lastName}'s Info`}
        />
        <Modal.Content>
          <EmployeeUpdateForm employee={employee} setOpen={setOpen} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default UpdateEmployee;
