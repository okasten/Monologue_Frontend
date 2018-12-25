import React, { Component } from "react";
import "./App.css";
import Header from "./components/Navbar.js";
import MonologueContainer from "./containers/MonologueContainer.js";
import LogInForm from "./components/LogInForm";
import { withRouter } from "react-router-dom";

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
        .then(user => {
          console.log("User", user);
          this.setState({
            current_user: user
          });
        });
    } else {
      this.setState({
        logIn: true
      });
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
          email: user.email,
          current_user: user
        }
      })
    })
      .then(response => response.json())
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          signUp: !this.state.signUp,
          current_user: resp.user
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
        console.log("respnonse from login", resp);
        localStorage.setItem("token", resp.jwt);
        this.setState({
          current_user: resp.user
        });
      });
  };

  handleLogOut = () => {
    console.log("logOut");
    localStorage.removeItem("token");
    this.setState({
      current_user: null
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          className="Header"
          handleLogIn={this.handleLogIn}
          handleSignUp={this.handleSignUp}
          current_user={this.state.current_user}
          handleLogOut={this.handleLogOut}
        />

        {this.state.logIn ? (
          <LogInForm
            context="logIn"
            handleClose={this.handleLogIn}
            logInFormSubmitHandler={this.logInFormSubmitHandler}
            current_user={this.state.current_user}
          />
        ) : null}
        {this.state.signUp ? (
          <LogInForm
            context="signUp"
            handleClose={this.handleSignUp}
            signUpFormSubmitHandler={this.signUpFormSubmitHandler}
            current_user={this.state.current_user}
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
