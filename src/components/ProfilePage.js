import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProfilePage extends Component {
  render() {
    return (
      <div className="profilePage">
        <h1 className="profile">PROFILE PAGE</h1>
        <h2> Username: {this.props.current_user.username} </h2>
        <h2> Email: {this.props.current_user.email} </h2>
      </div>
    );
  }
}
