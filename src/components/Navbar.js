import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import LogInForm from "./LogInForm";

export default class Header extends Component {
  render() {
    return (
      <Navbar
        inverse
        collapseOnSelect
        fixedTop
        handleLogIn={this.props.handleLogIn}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">The Thespian's Monologue Journal</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse handleLogIn={this.props.handleLogIn}>
          <Nav>
            <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight handleLogIn={this.props.handleLogIn}>
            <NavItem eventKey={1} href="#">
              Sign Up
            </NavItem>
            <NavItem onClick={this.props.handleLogIn}>Log In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}