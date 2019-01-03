import React, { Component } from "react";
import {
  Popover,
  OverlayTrigger,
  Button,
  ButtonToolbar,
  Col,
  Grid
} from "react-bootstrap";
import Stopwatch from "./Stopwatch";
import Notes from "./Notes";

export default class Monologue extends Component {
  state = {
    timer: false,
    notes: false
  };

  timerHandler = e => {
    this.setState({
      timer: !this.state.timer
    });
    this.props.handleTimer(e, this.props.monologue);
  };

  noteHandler = () => {
    console.log("notes");
    this.setState({
      notes: !this.state.notes
    });
  };

  render() {
    const fullMonologue = (
      <Col xs={6} xsOffset={6} className="monologue btn-center">
        <h3>
          <strong>{this.props.monologue.character}</strong> from{" "}
          <strong>{this.props.monologue.play}</strong>
        </h3>
        <p className="script">{this.props.monologue.script}</p>
        {this.props.monologue.scanFile ? (
          <img src={this.props.monologue.scanFile} alt="scanned monologue" />
        ) : null}

        <ButtonToolbar className="buttons" bsStyle="text-center">
          <Button
            onClick={() => this.props.handleShare(this.props.monologue)}
            bsSize="xsmall"
            bsStyle="primary"
          >
            Share Monologue
          </Button>
          <Button
            bsSize="xsmall"
            bsStyle="warning"
            onClick={e => this.props.handleEdit(e, this.props.monologue)}
          >
            Edit Monologue
          </Button>
          <Button
            bsSize="xsmall"
            bsStyle="danger"
            onClick={e => this.props.handleDelete(e, this.props.monologue)}
          >
            Delete Monologue
          </Button>
          <Button bsSize="xsmall" bsStyle="info" onClick={this.timerHandler}>
            Time Your Monologue
          </Button>
          <Button bsSize="xsmall" bsStyle="primary" onClick={this.noteHandler}>
            View Notes
          </Button>
        </ButtonToolbar>
      </Col>
    );

    console.log(this.props.monologue);
    return (
      <div>
        {fullMonologue}

        {this.state.timer ? (
          <Stopwatch
            monologue={this.props.monologue}
            handleClose={this.timerHandler}
            handlePatch={this.props.handlePatch}
          />
        ) : null}
        {this.state.notes ? (
          <Notes
            monologue={this.props.monologue}
            handleClose={this.noteHandler}
            handlePatch={this.props.handlePatch}
          />
        ) : null}
      </div>
    );
  }
}
