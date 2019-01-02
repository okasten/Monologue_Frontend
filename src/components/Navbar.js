import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import MonologueContainer from "../containers/MonologueContainer.js";
import ProfilePage from "./ProfilePage.js";

export default class Header extends Component {
  state = {
    showClick: false,
    profileClick: false
  };
  goToMonologues = () => {
    console.log("monologues");
    this.setState({
      showClick: !this.state.showClick,
      profileClick: false
    });
  };

  showProfile = () => {
    console.log("profile");
    this.setState({
      profileClick: !this.state.profileClick,
      showClick: false
    });
  };

  handleLogOut = () => {
    this.setState({
      profileClick: false,
      showClick: false
    });

    this.props.handleLogOut();
  };

  render() {
    return (
      <React.Fragment>
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
              <a href="http://localhost:3001">The Actor's Monologue Journal</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse
            handleLogIn={this.props.handleLogIn}
            handleSignUp={this.props.handleSignUp}
            handleLogOut={this.handleLogOut}
          >
            <Nav>
              {this.props.current_user ? (
                <React.Fragment>
                  <NavItem
                    onClick={this.goToMonologues}
                    current_user={this.props.current_user}
                    href="#"
                  >
                    <Link to="/monologues">My Monologues</Link>
                  </NavItem>
                </React.Fragment>
              ) : null}
            </Nav>
            <Nav
              pullRight
              handleLogIn={this.props.handleLogIn}
              handleSignUp={this.props.handleSignUp}
              handleLogOut={this.handleLogOut}
            >
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
                <React.Fragment>
                  <NavDropdown
                    eventKey={3}
                    title="Profile"
                    id="basic-nav-dropdown"
                  >
                    <MenuItem eventKey={3.1} onClick={this.showProfile}>
                      Account
                    </MenuItem>
                    <MenuItem eventKey={3.2}>Messages</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                  <NavItem onClick={this.handleLogOut}>
                    <Link to="/">Log Out </Link>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {!this.state.showClick && !this.state.profileClick ? (
          <React.Fragment>
            <h1 className="title">The Actor's Monologue Journal</h1>
            <h3 className="globe">The Globe Theatre, London</h3>
          </React.Fragment>
        ) : null}

        {this.state.showClick ? (
          <MonologueContainer
            current_user={this.props.current_user}
            className="monologueContainer"
          />
        ) : null}
        {this.state.profileClick ? (
          <ProfilePage
            updateUser={this.props.updateUser}
            current_user={this.props.current_user}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
