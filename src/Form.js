import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";

export default class Form extends Component {
  state = {
    character: "",
    play: "",
    age: 0,
    length: "",
    script: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <br />
        <PageHeader>Add A New Monologue</PageHeader>
        <form onSubmit={e => this.props.handleSubmit(e, this.state)}>
          <label>Character: </label>
          <input
            type="text"
            name="character"
            placeholder="Character Name"
            value={this.state.character}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <label>Play: </label>
          <input
            type="text"
            name="play"
            placeholder="Title of Play"
            value={this.state.play}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <label>Age: </label>
          <input
            type="number"
            name="age"
            placeholder="Age of Character"
            value={this.state.age}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <label>Length: </label>
          <input
            type="text"
            name="length"
            placeholder="Length of Monologue"
            value={this.state.length}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <label>Monologue: </label>
          <textarea
            name="script"
            placeholder="Enter Monologue Here..."
            value={this.state.script}
            onChange={event => this.handleChange(event)}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
