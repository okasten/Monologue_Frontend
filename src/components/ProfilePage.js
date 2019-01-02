import React, { Component } from "react";

import { Button, Form } from "react-bootstrap";

export default class ProfilePage extends Component {
  state = {
    editForm: false,
    picture: this.props.current_user.picture,
    username: this.props.current_user.username,
    email: this.props.current_user.email,
    name: this.props.current_user.name
  };
  editProfile = () => {
    console.log("edit");
    this.setState({
      editForm: !this.state.editForm
    });
  };

  handleChange = (e, values) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = (e, values) => {
    e.preventDefault();
    console.log(values);
    fetch(`http://localhost:3000/api/v1/users/${this.props.current_user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(resp => {
        this.props.updateUser(resp);
        console.log(values);
        this.setState({
          editForm: false,
          picture: values.picture,
          username: values.username,
          email: values.email,
          name: values.name
        });
      });
  };

  handleClose = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  };
  render() {
    return (
      <div className="profilePage">
        <h1 className="profile">PROFILE PAGE</h1>
        <div className="profileInfo">
          {this.props.current_user.picture === null ? (
            <img
              className="img-circle"
              src="http://worldartsme.com/images/actor-free-clipart-1.jpg"
              alt="profile"
            />
          ) : (
            <img
              className="img-circle"
              src={this.props.current_user.picture}
              alt="profile"
            />
          )}

          <h4>
            {" "}
            <strong>Name: </strong>
            {this.props.current_user.name}{" "}
          </h4>

          <h4>
            {" "}
            <strong>Username: </strong>
            {this.props.current_user.username}{" "}
          </h4>
          <h4>
            {" "}
            <strong>Email: </strong>
            {this.props.current_user.email}{" "}
          </h4>

          <Button bsStyle="primary" onClick={this.editProfile}>
            Edit Profile
          </Button>
        </div>

        {this.state.editForm ? (
          <div className="bg-modal-profile">
            <div className="modal-content-profile">
              <div className="close" onClick={this.handleClose}>
                +
              </div>
              <Form className="profileForm" onChange={this.handleChange}>
                <h2 className="center"> Edit Profile </h2>
                <br />
                <div className="form-group">
                  <img
                    className="img-circle center"
                    src={this.state.picture}
                    alt="profile"
                  />
                  <br />
                  <br />
                  Profile Picture URL: <input type="text" name="picture" />
                </div>

                <div className="form-group">
                  Name:{" "}
                  <input
                    type="text"
                    name="name"
                    placeholder={this.state.name}
                  />
                </div>

                <div className="form-group">
                  Username:{" "}
                  <input
                    type="text"
                    name="username"
                    placeholder={this.state.username}
                  />
                </div>

                <div className="form-group">
                  Email:{" "}
                  <input
                    type="text"
                    name="email"
                    placeholder={this.state.email}
                  />
                </div>

                <Button
                  bsStyle="primary"
                  className="center"
                  onClick={e => this.handleUpdate(e, this.state)}
                >
                  Update Profile
                </Button>
              </Form>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
