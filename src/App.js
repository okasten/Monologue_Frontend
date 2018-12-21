import React, { Component } from "react";
import "./App.css";
import Header from "./components/Navbar.js";
import MonologueContainer from "./containers/MonologueContainer.js";
import LogInForm from "./components/LogInForm";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    logIn: false,
    signUp: false
  };

  handleLogIn = () => {
    this.setState({
      logIn: !this.state.logIn,
      signUp: false
    });
  };
  handleSignUp = () => {
    this.setState({
      signUp: !this.state.signUp,
      logIn: false
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          className="Header"
          handleLogIn={this.handleLogIn}
          handleSignUp={this.handleSignUp}
        />

        {this.state.logIn ? (
          <LogInForm context="logIn" handleClose={this.handleLogIn} />
        ) : null}
        {this.state.signUp ? (
          <LogInForm context="signUp" handleClose={this.handleSignUp} />
        ) : null}
        <MonologueContainer className="monologueContainer" />
      </div>
    );
  }
}

export default App;
