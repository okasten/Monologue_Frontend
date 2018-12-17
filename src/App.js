import React, { Component } from "react";
import "./App.css";
import Header from "./Navbar.js";
import MonologueContainer from "./MonologueContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="Header" />
        <MonologueContainer />
      </div>
    );
  }
}

export default App;
