import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class LogInForm extends Component {
  state = {
    username: "",
    password: "",
    email: ""
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
            <h2>Welcome back!</h2>
          ) : (
            <h2>Welcome, Thespian!</h2>
          )}
          <div onClick={this.props.handleClose}>
            <Link to="/" className="close">
              +
            </Link>
          </div>

          {this.props.context === "logIn" ? (
            <Form horizontal onChange={this.handleChange}>
              <img
                className="img-rounded"
                alt="acting snl gif"
                src="http://media.giphy.com/media/1LiryotCCtd7y/giphy.gif"
              />
              <h3>Log In</h3>
              Username:{" "}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
              />
              Password:{" "}
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={this.state.password}
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
            <Form horizontal onChange={this.handleChange}>
              <img
                className="img-rounded"
                alt="acting snl gif"
                src="http://media.giphy.com/media/1LiryotCCtd7y/giphy.gif"
              />
              <h3>Sign Up</h3>
              Username:{" "}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
              />
              Email:{" "}
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
              />
              Password:{" "}
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={this.state.password}
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
