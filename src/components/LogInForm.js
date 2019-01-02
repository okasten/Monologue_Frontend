import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class LogInForm extends Component {
  state = {
    loginUsername: "",
    loginPassword: "",
    loginEmail: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="bg-modal">
        <div className="modal-content">
          {this.props.context === "logIn" ? (
            <h2>Log In!</h2>
          ) : (
            <h2>Sign Up!</h2>
          )}
          <div onClick={this.props.handleClose}>
            <Link to="/" className="close">
              +
            </Link>
          </div>

          {this.props.context === "logIn" ? (
            <Form className="loginForm" horizontal onChange={this.handleChange}>
              <img
                className="img-rounded"
                alt="acting snl gif"
                src="http://media.giphy.com/media/1LiryotCCtd7y/giphy.gif"
              />
              <br />
              <label>Username: </label>
              <input
                type="text"
                name="loginUsername"
                placeholder="Username"
                value={this.state.loginUsername}
              />
              <label>Password: </label>
              <input
                type="password"
                name="loginPassword"
                placeholder="Password"
                value={this.state.loginPassword}
              />
              <Button
                bsStyle="success"
                block
                className="log-in-button"
                onClick={e => this.props.logInFormSubmitHandler(e, this.state)}
              >
                Log In
              </Button>
            </Form>
          ) : (
            <Form horizontal className="loginForm" onChange={this.handleChange}>
              <img
                className="img-rounded"
                alt="acting snl gif"
                src="http://media.giphy.com/media/1LiryotCCtd7y/giphy.gif"
              />
              <br />
              <label>Username: </label>
              <input
                type="text"
                name="loginUsername"
                placeholder="Username"
                value={this.state.loginUsername}
              />
              <label>Email: </label>
              <input
                type="password"
                name="loginEmail"
                placeholder="Email"
                value={this.state.loginEmail}
              />
              <label>Password: </label>
              <input
                type="text"
                name="loginPassword"
                placeholder="Password"
                value={this.state.loginPassword}
              />
              <Button
                bsStyle="success"
                block
                className="sign-up-button"
                onClick={e => this.props.signUpFormSubmitHandler(e, this.state)}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </div>
      </div>
    );
  }
}
