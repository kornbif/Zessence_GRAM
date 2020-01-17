import React from "react";
import Sidenav from "./Sidenav";

import Header from "./Header";
import Footer from "./Footer";
import "./css/Layout.css";

function Layout(props) {
  return (
    <div className="layout-container">
      <Header />
      <Sidenav />
      <div className="layout-main">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
