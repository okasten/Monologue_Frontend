import React, { Component } from "react";
import {
  Popover,
  OverlayTrigger,
  Button,
  ButtonToolbar
} from "react-bootstrap";

export default class Monologue extends Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
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
      </div>
    );
  }
}
