import React, { Component } from "react";
import { PageHeader, Button } from "react-bootstrap";
import Form from "../components/Form.js";
import Monologue from "../components/Monologue.js";

export default class MonologueContainer extends Component {
  state = {
    monologues: [],
    addClicked: false,
    editClicked: false,
    currentMonologue: ""
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

    fetch("http://localhost:3000/monologues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character: values.character,
        play: values.play,
        age: values.age,
        genre: values.genre,
        length: values.length,
        script: values.script
      })
    })
      .then(response => response.json())
      .then(monologue => {
        let newArray = [...this.state.monologues, monologue];
        this.setState({
          monologues: newArray,
          addClicked: false
        });
      });
  };

  handleEdit = (e, monologue) => {
    this.setState({
      editClicked: !this.state.editClicked,
      currentMonologue: monologue
    });
  };

  handleDelete = (e, monologue) => {
    fetch(`http://localhost:3000/monologues/${monologue.id}`, {
      method: "DELETE"
    });

    let newArray = this.state.monologues.filter(mono => mono !== monologue);
    this.setState({
      monologues: newArray
    });
  };

  handlePatch = (e, values, monologue) => {
    fetch(`http://localhost:3000/monologues/${monologue.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(monologue => {
        let newArray = [...this.state.monologues];
        newArray[monologue.id - 1] = monologue;

        this.setState({
          editClicked: !this.state.editClicked,
          monologues: newArray
        });
      });
  };

  addMonologue = () => {
    this.setState({
      addClicked: !this.state.addClicked
    });
  };

  render() {
    let list = this.state.monologues.map(monologue => {
      return (
        <div className="individualMonologues">
          <Monologue
            key={monologue.play}
            monologue={monologue}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
          {this.state.editClicked ? (
            <Form
              handleSubmit={this.handlePatch}
              handleClose={this.handleEdit}
              context="edit"
              currentMonologue={this.state.currentMonologue}
            />
          ) : null}
        </div>
      );
    });
    return (
      <div>
        <br />
        <h1 className="pageHeader"> Monologue Repertoire </h1>
        {list}
        <Button
          bsStyle="primary"
          className="button"
          onClick={this.addMonologue}
        >
          Add A New Monologue
        </Button>
        {this.state.addClicked ? (
          <Form
            handleSubmit={this.handleSubmit}
            handleClose={this.addMonologue}
            currentMonologue={""}
          />
        ) : null}
      </div>
    );
  }
}
