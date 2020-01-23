import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks";

import { Button, Form, Modal, Icon, Header } from "semantic-ui-react";

const NewSchedule = ({ employee: { _id } }) => {
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const onClickModal = () => {
    setOpen(true);
  };

  const { values, onChange, onSubmit } = useForm(createScheduleCallback, {
    date: "",
    startTime: "7:00 AM",
    timeLength: "9",
    startOfBreak: "12:00 PM",
    breakLength: "1"
  });
  const [addSchedule, { loading }] = useMutation(CREATE_NEW_SCHEDULE, {
    variables: {
      employeeId: _id,
      date: new Date(values.date).toDateString(),
      start: values.startTime,
      startLength: parseInt(values.timeLength),
      break: values.startOfBreak,
      breakLength: parseInt(values.breakLength)
    },
    update() {
      setOpen(false);
      values.date = "";
      values.startTime = "";
      values.timeLength = "";
      values.contact = "";
      values.startOfBreak = "";
      values.breakLength = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  function createScheduleCallback() {
    addSchedule();
  }

  return (
    <>
      <Button color="blue" onClick={onClickModal}>
        <Icon name="add" />
        New Schedule
      </Button>
      <Modal open={open} size={"small"}>
        <Icon name="close" onClick={() => setOpen(false)} />
        <Header icon="archive" content="Add new employee" />
        <Modal.Content>
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <Form.Group>
              <div className="field">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={onChange}
                  onKeyPress={false}
                />
              </div>
            </Form.Group>
            <Form.Group widths={16}>
              <div className="field">
                <label htmlFor="startTime">Start</label>
                <select
                  name="startTime"
                  className="ui dropdown"
                  onChange={onChange}
                  value={values.startTime}
                >
                  <option value="5:00 AM">5:00 AM</option>
                  <option value="5:30 AM">5:30 AM</option>
                  <option value="6:00 AM">6:00 AM</option>
                  <option value="6:30 AM">6:30 AM</option>
                  <option value="7:00 AM">7:00 AM</option>
                  <option value="7:30 AM">7:30 AM</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="8:30 AM">8:30 AM</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                  <option value="11:30 PM">11:30 PM</option>
                  <option value="12:00 AM">12:00 AM</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="timeLength">Time Length</label>
                <select
                  name="timeLength"
                  className="ui dropdown"
                  onChange={onChange}
                  value={values.timeLength}
                >
                  <option value="1">1 hr</option>
                  <option value="2">2 hr</option>
                  <option value="3">3 hr</option>
                  <option value="4">4 hr</option>
                  <option value="5">5 hr</option>
                  <option value="6">6 hr</option>
                  <option value="7">7 hr</option>
                  <option value="8">8 hr</option>
                  <option value="9">9 hr</option>
                </select>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="field">
                <label htmlFor="startOfBreak">Break Time</label>
                <select
                  name="startOfBreak"
                  className="ui dropdown"
                  onChange={onChange}
                  value={values.startOfBreak}
                >
                  <option value="5:00 AM">5:00 AM</option>
                  <option value="5:30 AM">5:30 AM</option>
                  <option value="6:00 AM">6:00 AM</option>
                  <option value="6:30 AM">6:30 AM</option>
                  <option value="7:00 AM">7:00 AM</option>
                  <option value="7:30 AM">7:30 AM</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="8:30 AM">8:30 AM</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                  <option value="11:30 PM">11:30 PM</option>
                  <option value="12:00 AM">12:00 AM</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="breakLength">Time Length</label>
                <select
                  name="breakLength"
                  className="ui dropdown"
                  onChange={onChange}
                  value={values.breakLength}
                >
                  <option value="1">1 hr</option>
                  <option value="2">2 hr</option>
                  <option value="3">3 hr</option>
                  <option value="4">4 hr</option>
                  <option value="5">5 hr</option>
                  <option value="6">6 hr</option>
                  <option value="7">7 hr</option>
                  <option value="8">8 hr</option>
                  <option value="9">9 hr</option>
                </select>
              </div>
            </Form.Group>

            <Button type="submit">Add</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

const CREATE_NEW_SCHEDULE = gql`
  mutation addSchedule(
    $employeeId: ID!
    $date: String!
    $start: String
    $startLength: Int!
    $break: String
    $breakLength: Int!
  ) {
    addSchedule(
      employeeId: $employeeId
      date: $date
      timeInput: { startTime: $start, timeLength: $startLength }
      breakTimeInput: { startOfBreak: $break, breakLength: $breakLength }
    ) {
      _id
      schedule {
        id
        date
        start
        break
      }
    }
  }
`;

export default NewSchedule;
