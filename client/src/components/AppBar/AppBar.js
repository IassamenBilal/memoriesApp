import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

class AppBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav navbar className="ml-auto"></Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppBar;
