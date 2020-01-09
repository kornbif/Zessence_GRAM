import React from "react";
import { Image, Menu, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./css/sidenav.css";

function Sidenav() {
  return (
    <div className="layout-sidenav">
      <div className="avatar">
        <Image
          src="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          size="small"
          circular
        />
        <h4>Z Essence</h4>
      </div>

      <div className="sidenav-content">
        <Menu fluid vertical size="huge">
          <Menu.Item name="Dashboard" as={Link} to="/zeadmin" />
          <Menu.Item name="Appointments" as={Link} to="/zeadmin/appointments" />
          <Menu.Item name="Employees" as={Link} to="/zeadmin/employees" />
          <Menu.Item name="Services" />
        </Menu>
      </div>
    </div>
  );
}

export default Sidenav;
