import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";
import Form from "./Form.js";
import Monologue from "./Monologue.js";

export default class MonologueContainer extends Component {
  state = {
    monologues: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/monologues")
      .then(response => response.json())
      .then(monologues => {
        this.setState({
          monologues: monologues
        });
      });
  }
  handleSubmit = (e, values) => {
    e.preventDefault();
    console.log(values);
  };
  render() {
    let list = this.state.monologues.map(monologue => {
      return <Monologue key={monologue.play} monologue={monologue} />;
    });
    return (
      <div>
        <br />
        <PageHeader> Monologue Repertoire </PageHeader>
        {list}
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
