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
import Share from "../components/Share.js";

export default class MonologueContainer extends Component {
  state = {
    monologues: [],
    addClicked: false,
    editClicked: false,
    currentMonologue: "",
    showSingleMonologue: false,
    timer: false,
    share: false
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

  handlePatch = (e, values) => {
    fetch(
      `http://localhost:3000/api/v1/users/${
        this.props.current_user.id
      }/usermonologues/${this.state.currentMonologue.id}`,
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
        let oldMonologue = newArray.indexOf(this.state.currentMonologue);

        newArray[oldMonologue] = resmonologue;

        this.setState({
          editClicked: false,
          monologues: newArray,
          currentMonologue: resmonologue
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
      showSingleMonologue: !this.state.showSingleMonologue,
      share: false
    });
  };

  closeEdit = () => {
    this.setState({
      editClicked: !this.state.editClicked,
      share: false
    });
  };

  handleShare = monologue => {
    console.log(monologue);
    this.setState({
      share: !this.state.share
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
          <h3
            className="monologue-title"
            onClick={() => this.handleClick(monologue)}
          >
            {monologue.character} from {monologue.play}
          </h3>
        </OverlayTrigger>
      );
    });
    return (
      <Grid className="monologuepage">
        <br />
        <h1 className="pageHeader"> Monologue Repertoire </h1>
        <Row>
          <Col xs={4} md={4} className="monologueContainer">
            {list}
            <Button
              bsStyle="primary"
              className="button"
              onClick={this.addMonologue}
            >
              Add A New Monologue
            </Button>
          </Col>
          <Col xs={16} md={8} className="showMonologue">
            {this.state.showSingleMonologue ? (
              <Monologue
                monologue={this.state.currentMonologue}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleTimer={this.handleTimer}
                handlePatch={this.handlePatch}
                handleShare={this.handleShare}
              />
            ) : null}
          </Col>
        </Row>
        {this.state.addClicked ? (
          <Form
            handleSubmit={this.handleSubmit}
            handleClose={this.addMonologue}
            monologue={""}
          />
        ) : null}
        {this.state.editClicked ? (
          <Form
            monologue={this.state.currentMonologue}
            handleSubmit={this.handlePatch}
            handleClose={this.closeEdit}
            context="edit"
          />
        ) : null}
        {this.state.share ? (
          <Share
            monologue={this.state.currentMonologue}
            current_user={this.props.current_user}
            handleClose={this.handleShare}
          />
        ) : null}
      </Grid>
    );
  }
}
