import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Menu, Button, Image } from "semantic-ui-react";
import "./css/header.css";
function Header() {
  const { logout } = useContext(AuthContext);
  return (
    <Menu className="layout-header" secondary>
      <Menu.Menu position="right">
        <Menu.Item>
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
            size="mini"
          />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={logout}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
