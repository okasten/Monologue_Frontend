import React, { Component } from "react";
import { Button, Grid, Col } from "react-bootstrap";
import Form from "../components/Form.js";
import Monologue from "../components/Monologue.js";

export default class MonologueContainer extends Component {
  state = {
    monologues: [],
    addClicked: false,
    editClicked: false,
    currentMonologue: "",
    timer: false
  };

  componentDidMount() {
    console.log(this.props.current_user.id);
    fetch(
      `http://localhost:3000/api/v1/users/${
        this.props.current_user.id
      }/usermonologues`
    )
      .then(response => response.json())
      .then(monologues => {
        console.log(monologues);
        this.setState({
          monologues: monologues
        });
      });
  }
  handleSubmit = (e, values) => {
    e.preventDefault();
    fetch(
      `http://localhost:3000/api/v1/users/${
        this.props.current_user.id
      }/usermonologues`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: values.character,
          play: values.play,
          age: values.age,
          genre: values.genre,
          length: values.length,
          script: values.script,
          file: values.file
        })
      }
    )
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
    fetch(
      `http://localhost:3000/api/v1/users/${
        this.props.current_user.id
      }/usermonologues/${monologue.id}`,
      {
        method: "DELETE"
      }
    );

    let newArray = this.state.monologues.filter(mono => mono !== monologue);
    this.setState({
      monologues: newArray
    });
  };

  handlePatch = (e, values, monologue) => {
    console.log(monologue);
    fetch(
      `http://localhost:3000/api/v1/users/${
        this.props.current_user.id
      }/usermonologues/${monologue.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    )
      .then(response => response.json())
      .then(resmonologue => {
        // let spliced = [...this.state.monologues].splice()
        let newArray = [...this.state.monologues];
        let oldMonologue = newArray.indexOf(monologue);
        debugger;
        newArray[oldMonologue] = resmonologue;

        this.setState({
          editClicked: false,
          monologues: newArray
        });
      });
  };

  addMonologue = () => {
    this.setState({
      addClicked: !this.state.addClicked
    });
  };

  handleTimer = (e, monologue) => {
    console.log("handle timer", monologue);
    this.setState({
      timer: !this.state.timer
    });
  };
  render() {
    let list = this.state.monologues.map((monologue, i) => {
      return (
        <div key={i} className="individualMonologues">
          <Monologue
            key={monologue.play}
            monologue={monologue}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleTimer={this.handleTimer}
            handlePatch={this.handlePatch}
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
      <Grid>
        <br />
        <h1 className="pageHeader"> Monologue Repertoire </h1>
        <Col xs={6} md={6}>
          {list}
          <Button
            bsStyle="primary"
            className="button"
            onClick={this.addMonologue}
          >
            Add A New Monologue
          </Button>
        </Col>
        {this.state.addClicked ? (
          <Form
            handleSubmit={this.handleSubmit}
            handleClose={this.addMonologue}
            currentMonologue={""}
          />
        ) : null}
      </Grid>
    );
  }
}
