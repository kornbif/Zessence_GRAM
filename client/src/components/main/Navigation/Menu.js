import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { Link } from "react-router-dom";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";

const Menu = ({ open }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <StyledMenu open={open}>
      <Link to="/zessence">Home</Link>
      <Link to="/zessence/about">About</Link>
      <Link to="/zessence/appointment">Appointment</Link>
      {user ? (
        <>
          <Link to="/zessence/myaccount">My Account</Link>
          <a onClick={logout}>Logout</a>
        </>
      ) : (
        <>
          <Link to="/zessence/login">Login</Link>
          <Link to="/zessence/register">Register</Link>
        </>
      )}
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired
};

export default Menu;
