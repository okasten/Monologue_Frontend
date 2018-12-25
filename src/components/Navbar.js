import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Navbar
        inverse
        collapseOnSelect
        fixedTop
        handleLogIn={this.props.handleLogIn}
        handleSignUp={this.props.handleSignUp}
        current_user={this.props.current_user}
        handleLogOut={this.props.handleLogOut}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">The Actor's Monologue Journal</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse
          handleLogIn={this.props.handleLogIn}
          handleSignUp={this.props.handleSignUp}
          handleLogOut={this.props.handleLogOut}
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
            handleLogOut={this.props.handleLogOut}
          >
            <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Account</MenuItem>
              <MenuItem eventKey={3.2}>Messages</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>

            {!this.props.current_user ? (
              <React.Fragment>
                <NavItem onClick={this.props.handleSignUp}>
                  <Link to="/signup">Sign Up</Link>
                </NavItem>

                <NavItem onClick={this.props.handleLogIn}>
                  <Link to="/login">Log In</Link>
                </NavItem>
              </React.Fragment>
            ) : (
              <NavItem onClick={this.props.handleLogOut}>
                <Link to="/">Log Out </Link>
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
