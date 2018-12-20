import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <Navbar
        inverse
        collapseOnSelect
        fixedTop
        handleLogIn={this.props.handleLogIn}
        handleSignUp={this.props.handleSignUp}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">The Thespian's Monologue Journal</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse
          handleLogIn={this.props.handleLogIn}
          handleSignUp={this.props.handleSignUp}
        >
          <Nav>
            <NavItem eventKey={1} href="#">
              My Monologues
            </NavItem>
            <NavItem eventKey={2} href="#">
              Share A Monologue
            </NavItem>
          </Nav>
          <Nav
            pullRight
            handleLogIn={this.props.handleLogIn}
            handleSignUp={this.props.handleSignUp}
          >
            <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Account</MenuItem>
              <MenuItem eventKey={3.2}>Messages</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavItem onClick={this.props.handleSignUp}>Sign Up</NavItem>
            <NavItem onClick={this.props.handleLogIn}>Log In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
