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
  render() {
    return (
      <div className="profilePage">
        <h1 className="profile">PROFILE PAGE</h1>
        <img src={this.props.current_user.picture} alt="profile" />
        <h4> Name: {this.props.current_user.name} </h4>

        <h4> Username: {this.props.current_user.username} </h4>
        <h4> Email: {this.props.current_user.email} </h4>

        <Button onClick={this.editProfile}>Edit Profile</Button>

        {this.state.editForm ? (
          <Form onChange={this.handleChange}>
            <img src={this.state.picture} alt="profile" />
            <input type="file" /> <br />
            Name:{" "}
            <input type="text" name="name" placeholder={this.state.name} />
            <br />
            Username:{" "}
            <input
              type="text"
              name="username"
              placeholder={this.state.username}
            />
            <br />
            Email:{" "}
            <input type="text" name="email" placeholder={this.state.email} />
            <br />
            <Button onClick={e => this.handleUpdate(e, this.state)}>
              Update Profile
            </Button>
          </Form>
        ) : null}
      </div>
    );
  }
}
