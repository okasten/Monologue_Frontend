import React, { Component } from "react";
import "./App.css";
import Header from "./components/Navbar.js";
import MonologueContainer from "./containers/MonologueContainer.js";
import LogInForm from "./components/LogInForm";

class App extends Component {
  state = {
    logIn: false
  };

  handleLogIn = () => {
    console.log("ive been clicked");
    this.setState({
      logIn: !this.state.logIn
    });
  };
  render() {
    return (
      <div className="App">
        <Header className="Header" handleLogIn={this.handleLogIn} />
        {this.state.logIn ? (
          <LogInForm context="logIn" handleClose={this.handleLogIn} />
        ) : null}
        <MonologueContainer className="monologueContainer" />
      </div>
    );
  }
}

export default App;
