import React from "react";
import { Link } from "react-router-dom";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/zessence">Home</Link>
      <Link to="/zessence/about">About</Link>
      <Link to="/zessence/register">Register</Link>
      <Link to="/zessence/login">Login</Link>
      <Link to="/zessence/appointment">Appointment</Link>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired
};

export default Menu;
