import React, { Component } from "react";
import "./App.css";
import Header from "./components/Navbar.js";
import LogInForm from "./components/LogInForm";
import { withRouter } from "react-router-dom";

class App extends Component {
  state = {
    logIn: false,
    signUp: false,
    user: ""
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      let token = localStorage.getItem("token");

      fetch("http://localhost:3000/api/v1/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Action: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(user => {
          console.log("User", user);
          this.setState({
            user: user.user
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

  signUpFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
    this.props.history.push("/");
  };

  logInFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.getUser(userInfo);
    this.props.history.push("/");
  };

  createUser = userInfo => {
    fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.loginUsername,
          password: userInfo.loginPassword,
          email: userInfo.loginEmail
        }
      })
    })
      .then(response => response.json())
      .then(resp => {
        console.log(resp);
        this.setState({
          user: resp.user,
          signUp: false
        });
      });
  };

  getUser = userInfo => {
    fetch("http://localhost:3000/api/v1/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.loginUsername,
          password: userInfo.loginPassword
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log("respnonse from login", resp);
        localStorage.setItem("token", resp.jwt);
        this.setState({
          user: resp.user,
          logIn: false
        });
      });
  };

  handleLogOut = () => {
    console.log("logOut");
    localStorage.removeItem("token");
    this.setState({
      user: null
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          className="Header"
          handleLogIn={this.handleLogIn}
          handleSignUp={this.handleSignUp}
          current_user={this.state.user}
          handleLogOut={this.handleLogOut}
        />

        {this.state.logIn ? (
          <LogInForm
            context="logIn"
            handleClose={this.handleLogIn}
            logInFormSubmitHandler={this.logInFormSubmitHandler}
            current_user={this.state.user}
          />
        ) : null}
        {this.state.signUp ? (
          <LogInForm
            context="signUp"
            handleClose={this.handleSignUp}
            signUpFormSubmitHandler={this.signUpFormSubmitHandler}
            current_user={this.state.user}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(App);
