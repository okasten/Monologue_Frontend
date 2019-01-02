import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import SearchUsers from "./SearchUsers.js";

export default class Share extends Component {
  state = {
    shareUser: "",
    users: []
  };

  shareWithUser = username => {
    this.setState({
      shareUser: username
    });
  };

  allUsers = users => {
    this.setState({
      users: users
    });
  };

  shareMonologue = () => {
    let user = this.state.users.find(
      user => user.username === this.state.shareUser
    );
    console.log(user);
    fetch(`http://localhost:3000/api/v1/users/${user.id}/usermonologues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.props.monologue)
    })
      .then(response => response.json())
      .then(console.log);
  };

  render() {
    return (
      <div>
        <h1>
          Share {this.props.monologue.character} from{" "}
          {this.props.monologue.play} with another user!
        </h1>
        <SearchUsers
          current_user={this.props.current_user}
          shareWithUser={this.shareWithUser}
          allUsers={this.allUsers}
        />
        <Button onClick={this.shareMonologue}>SHARE</Button>
      </div>
    );
  }
}
