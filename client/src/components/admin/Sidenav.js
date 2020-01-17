import React from "react";
import { Image, Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./css/sidenav.css";

function Sidenav() {
  return (
    <div className="layout-sidenav">
      <div className="avatar">
        <Image
          src="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          size="small"
          rounded
        />
        <h4>Z Essence</h4>
      </div>

      <div className="sidenav-content">
        <Menu fluid vertical size="large">
          <Menu.Item name="dashboard" as={NavLink} to="/zeadmin/dashboard" />
          <Menu.Item
            name="appointments"
            as={NavLink}
            to="/zeadmin/appointments"
          />
          <Menu.Item name="messages" />
          <Dropdown item text="Accounts">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/zeadmin/dashboard">
                Users
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/zeadmin/dashboard">
                Admins
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text="Content Manangement">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/zeadmin/dashboard">
                Home
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/zeadmin/dashboard">
                About Us
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/zeadmin/dashboard">
                Gallery
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text="File Maintenance">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/zeadmin/employees">
                Employees
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/zeadmin/services">
                Services
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    </div>
  );
}

export default Sidenav;
