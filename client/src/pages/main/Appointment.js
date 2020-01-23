import React, { useState } from "react";

import AppointmentForm from "../../components/main/Appointment/AppointmentForm";
import { StyledContainer } from "../../components/main/StyledContainer.styled";

const Appointment = () => {
  return (
    <StyledContainer>
      <AppointmentForm />
    </StyledContainer>
  );
};

export default Appointment;
