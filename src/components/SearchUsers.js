import React, { Component } from "react";
import { Button, Form, Grid, Col } from "react-bootstrap";

export default class SearchUsers extends Component {
  state = {
    users: [],
    search: "",
    searchArray: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/users")
      .then(response => response.json())
      .then(userInfo => {
        console.log(userInfo);
        let newArray = userInfo.map(user => user.username);
        this.setState({
          users: newArray,
          searchArray: newArray
        });

        this.props.allUsers(userInfo);
      });
  }

  filterUsers = e => {
    let filteredArray = [...this.state.users].filter(username =>
      username.includes(e.target.value)
    );

    this.setState({
      search: e.target.value,
      searchArray: filteredArray
    });
  };

  setUser = user => {
    this.setState({
      search: user
    });
    this.props.shareWithUser(user);
  };

  render() {
    let userSearch = this.state.searchArray.map(user => {
      return <Col onClick={() => this.setUser(user)}>{user}</Col>;
    });
    return (
      <div>
        <h2>Search users</h2>
        <input
          type="text"
          onChange={this.filterUsers}
          value={this.state.search}
          placeholder="Search Users by Username"
        />
        <Grid>{userSearch}</Grid>
      </div>
    );
  }
}
