import React, { Component } from "react";
import {
  Popover,
  OverlayTrigger,
  Button,
  ButtonToolbar
} from "react-bootstrap";
import Stopwatch from "./Stopwatch";

export default class Monologue extends Component {
  state = {
    clicked: false,
    timer: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  timerHandler = e => {
    this.setState({
      timer: !this.state.timer
    });
    this.props.handleTimer(e, this.props.monologue);
  };

  render() {
    const popoverHoverFocus = (
      <Popover
        id="popover-trigger-hover-focus"
        title={this.props.monologue.character}
      >
        <strong>Genre: </strong>
        {this.props.monologue.genre} <br />
        <strong>Age: </strong>
        {this.props.monologue.age} <br />
        <strong>Length: </strong>
        {this.props.monologue.length}
      </Popover>
    );

    const fullMonologue = (
      <div className="monologue btn-center">
        <h3>
          {this.props.monologue.character} from {this.props.monologue.play}
        </h3>
        <p>{this.props.monologue.script}</p>
        <ButtonToolbar className="buttons" bsStyle="text-center">
          <Button
            bsSize="small"
            bsStyle="warning"
            onClick={e => this.props.handleEdit(e, this.props.monologue)}
          >
            Edit Monologue
          </Button>
          <Button
            bsSize="small"
            bsStyle="danger"
            onClick={e => this.props.handleDelete(e, this.props.monologue)}
          >
            Delete Monologue
          </Button>
          <Button bsSize="small" bsStyle="info" onClick={this.timerHandler}>
            Time Your Monologue
          </Button>
        </ButtonToolbar>
      </div>
    );
    return (
      <div>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <h3 onClick={this.handleClick}>
            {this.props.monologue.character} from {this.props.monologue.play}
          </h3>
        </OverlayTrigger>

        {this.state.clicked ? fullMonologue : null}
        {this.state.timer ? (
          <Stopwatch
            monologue={this.props.monologue}
            handleClose={this.timerHandler}
            handlePatch={this.props.handlePatch}
          />
        ) : null}
      </div>
    );
  }
}
