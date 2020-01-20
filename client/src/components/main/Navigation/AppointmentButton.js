import React from "react";
import { Link } from "react-router-dom";

import { StyledAppointmentButton } from "./AppointmentButton.styled";

const AppointmentButton = () => {
  return (
    <Link to="/zessence/appointment">
      <StyledAppointmentButton>Book Appointment</StyledAppointmentButton>
    </Link>
  );
};

export default AppointmentButton;
