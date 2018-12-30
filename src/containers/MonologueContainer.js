import React, { Component } from "react";
import {
  Button,
  Grid,
  Col,
  Row,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import Form from "../components/Form.js";
import Monologue from "../components/Monologue.js";

export default class MonologueContainer extends Component {
  state = {
    monologues: [],
    addClicked: false,
    editClicked: false,
    currentMonologue: "",
    showSingleMonologue: false,
    timer: false
  };

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/users/${
        this.props.current_user.id
      }/usermonologues`
    )
      .then(response => response.json())
      .then(monologues => {
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
    e.preventDefault();
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
      monologues: newArray,
      showSingleMonologue: !this.state.showSingleMonologue
    });
  };

  handlePatch = (e, values, monologue) => {
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
        let newArray = [...this.state.monologues];
        let oldMonologue = newArray.indexOf(monologue);

        newArray[oldMonologue] = resmonologue;

        this.setState({
          editClicked: false,
          monologues: newArray,
          showSingleMonologue: !this.state.showSingleMonologue
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

  handleClick = monologue => {
    this.setState({
      currentMonologue: monologue,
      showSingleMonologue: !this.state.showSingleMonologue
    });
  };

  closeEdit = () => {
    this.setState({
      editClicked: !this.state.editClicked
    });
  };
  render() {
    let list = this.state.monologues.map((monologue, i) => {
      const popoverHoverFocus = (
        <Popover id="popover-trigger-hover-focus" title={monologue.character}>
          <strong>Genre: </strong>
          {monologue.genre} <br />
          <strong>Age: </strong>
          {monologue.age} <br />
          <strong>Length: </strong>
          {monologue.length}
        </Popover>
      );
      return (
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <h3 className="title" onClick={() => this.handleClick(monologue)}>
            {monologue.character} from {monologue.play}
          </h3>
        </OverlayTrigger>
      );
    });
    return (
      <Grid>
        <br />
        <h1 className="pageHeader"> Monologue Repertoire </h1>
        <Row>
          <Col xs={6} md={4}>
            {list}
            <Button
              bsStyle="primary"
              className="button"
              onClick={this.addMonologue}
            >
              Add A New Monologue
            </Button>
          </Col>
          <Col xs={12} md={8}>
            {this.state.showSingleMonologue ? (
              <Monologue
                monologue={this.state.currentMonologue}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleTimer={this.handleTimer}
                handlePatch={this.handlePatch}
              />
            ) : null}
          </Col>
        </Row>
        {this.state.addClicked ? (
          <Form
            handleSubmit={this.handleSubmit}
            handleClose={this.addMonologue}
            currentMonologue={""}
          />
        ) : null}
        {this.state.editClicked ? (
          <Form
            currentMonologue={this.state.currentMonologue}
            handleSubmit={this.handlePatch}
            handleClose={this.closeEdit}
          />
        ) : null}
      </Grid>
    );
  }
}
