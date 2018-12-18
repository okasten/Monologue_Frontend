import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class LogInForm extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  };
  render() {
    return (
      <div className="bg-modal">
        <div className="modal-content">
          {this.props.context === "logIn" ? (
            <h2>Welcome back, Thespian!</h2>
          ) : (
            <h2>Welcome, Thespian!</h2>
          )}
          <div className="close" onClick={this.props.handleClose}>
            +
          </div>
          <form>
            <img
              className="img-rounded"
              alt="log in default image"
              src="http://media.giphy.com/media/1LiryotCCtd7y/giphy.gif"
            />
            {this.props.context === "logIn" ? (
              <h3>Log In</h3>
            ) : (
              <h3>Sign Up</h3>
            )}
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <Button bsStyle="success" block className="log-in-button">
              Log In
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
