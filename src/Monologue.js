import React, { Component } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

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

        {this.state.clicked ? <p>{this.props.monologue.script}</p> : null}
      </div>
    );
  }
}
