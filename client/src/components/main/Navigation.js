import React, { useState, useRef } from "react";
import { useOnClickOutside } from "./Navigation/hook";
import { ThemeProvider } from "styled-components";
import { theme } from "./Navigation/theme";

import Burger from "./Navigation/Burger";
import Menu from "./Navigation/Menu";
import AppointmentButton from "./Navigation/AppointmentButton";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <ThemeProvider theme={theme}>
      <AppointmentButton />
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </ThemeProvider>
  );
};

export default Navigation;
