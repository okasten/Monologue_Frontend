import React, { Component } from "react";
import "./App.css";
import Header from "./components/Navbar.js";
import MonologueContainer from "./containers/MonologueContainer.js";
import LogInForm from "./components/LogInForm";
import { Route, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    logIn: false,
    signUp: false,
    current_user: null
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      let token = localStorage.getItem("token");

      fetch("http://localhost:3000/api/v1/current_user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Action: "application/json",
          Authorization: `${token}`
        }
      })
        .then(response => response.json())
        .then(console.log);
    } else {
      return <h1>Please log in</h1>;
    }
  }

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

  signUpFormSubmitHandler = (e, user) => {
    e.preventDefault();
    this.createuser(user);
    this.props.history.push("/");
  };

  logInFormSubmitHandler = (e, user) => {
    e.preventDefault();
    this.getUser(user);
    this.props.history.push("/");
  };

  createuser = user => {
    fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
          email: user.email
        }
      })
    })
      .then(response => response.json())
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          user: resp.user,
          signUp: !this.state.signUp
        });
      });
  };

  getUser = user => {
    fetch("http://localhost:3000/api/v1/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          user: resp.user
        });
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
          <LogInForm
            context="logIn"
            handleClose={this.handleLogIn}
            logInFormSubmitHandler={this.logInFormSubmitHandler}
          />
        ) : null}
        {this.state.signUp ? (
          <LogInForm
            context="signUp"
            handleClose={this.handleSignUp}
            signUpFormSubmitHandler={this.signUpFormSubmitHandler}
          />
        ) : null}
        <MonologueContainer
          current_user={this.state.current_user}
          className="monologueContainer"
        />
      </div>
    );
  }
}

export default withRouter(App);
