import React, { useState, useContext, useEffect } from "react";
import { useForm } from "../../../util/hooks";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../../context/auth";
import DatePicker from "react-datepicker";

import { FETCH_APPOINTMENTS_QUERY } from "../../../util/graphql";

import "react-datepicker/dist/react-datepicker.css";
import { Dimmer, Loader, Container, Form, Button } from "semantic-ui-react";

const AppointmentForm = () => {
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date, e) => {};

  const { loading: loadingService, data: dataService } = useQuery(
    FETCH_SERVICES_QUERY
  );

  const { loading: loadingg, data: dataa } = useQuery(FETCH_EMPLOYEES_QUERY);

  useEffect(() => {
    if (dataService) {
      setServices(dataService.services);
    }
  }, [dataService]);

  //   useEffect(() => {
  //     if (result) {
  //       setServices(result.employees);
  //     }
  //   }, [result]);

  const { values, onChange, onSubmit } = useForm(createAppointmentCallback, {
    serviceId: "",
    employeeId: "",
    date: "",
    time: "",
    message: ""
  });

  const [createAppointment, { loading }] = useMutation(
    CREATE_APPOINTMENT_MUTATION,
    {
      variables: {
        serviceId: values.serviceId,
        employeeId: values.employeeId,
        date: new Date(values.date).toDateString(),
        time: values.time,
        message: values.message
      },
      update(cache, result) {
        const data = cache.readQuery({
          query: FETCH_APPOINTMENTS_QUERY
        });
        const newAppointment = result.data.createAppointment;
        cache.writeQuery({
          query: FETCH_APPOINTMENTS_QUERY,
          data: { appointments: [newAppointment, ...data.appointments] }
        });

        values.serviceId = "";
        values.employeeId = "";
        values.date = "";
        values.time = "";
        values.message = "";
      }
    }
  );

  function createAppointmentCallback() {
    createAppointment();
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <select
          name="serviceId"
          className="ui selecttion dropdown"
          onChange={onChange}
          value={values.serviceId}
        >
          {loadingService ? (
            <>
              <Dimmer>
                <Loader>Loading</Loader>
              </Dimmer>
            </>
          ) : (
            dataService.services &&
            dataService.services.map(service => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))
          )}
        </select>
        <select
          name="employeeId"
          className="ui selecttion dropdown"
          onChange={onChange}
          value={values.employeeId}
        >
          {loadingg ? (
            <>
              <Dimmer>
                <Loader>Loading</Loader>
              </Dimmer>
            </>
          ) : (
            dataa.employees &&
            dataa.employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))
          )}
        </select>
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={onChange}
          onKeyPress={false}
        />
        <select
          name="time"
          className="ui selecttion dropdown"
          onChange={onChange}
          value={values.time}
        >
          <option value="9:00 AM">9:00 AM</option>
          <option value="9:30 AM">9:30 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="10:30 AM">10:30 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="11:30 AM">11:30 AM</option>
          <option value="12:00 AM">12:00 AM</option>
        </select>
        <textarea
          name="message"
          onChange={onChange}
          value={values.message}
        ></textarea>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

const FETCH_SERVICES_QUERY = gql`
  {
    services {
      _id
      name
      price
      duration
    }
  }
`;

const FETCH_EMPLOYEES_QUERY = gql`
  {
    employees {
      _id
      firstName
      lastName
      schedule {
        id
        date
        start
      }
    }
  }
`;

const CREATE_APPOINTMENT_MUTATION = gql`
  mutation createAppointment(
    $serviceId: ID!
    $employeeId: ID!
    $date: String!
    $time: String!
    $message: String
  ) {
    createAppointment(
      inputAppointment: {
        serviceId: $serviceId
        employeeId: $employeeId
        date: $date
        time: $time
        message: $message
      }
    ) {
      _id
      date
      time
    }
  }
`;

export default AppointmentForm;
