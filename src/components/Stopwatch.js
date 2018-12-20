import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";

export default class Stopwatch extends Component {
  state = {
    time: 0,
    running: false
  };

  startClock = () => {
    this.interval = setInterval(this.clockTick, 1000);
    this.setState({
      running: true
    });
  };

  clockTick = () => {
    if (this.state.running) {
      this.setState(prevState => ({
        time: prevState.time + 1,
        running: true
      }));
    }
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({
      running: false
    });
  };

  handleClear = () => {
    clearInterval(this.interval);
    this.setState({
      time: 0,
      running: false
    });
  };

  logTime = e => {
    let current = this.state.time;
    let minutes = Math.floor(current / 60);
    let seconds = current % 60;
    let timeLength = minutes + " minutes " + seconds + " seconds";

    this.props.handlePatch(e, { length: timeLength }, this.props.monologue);
    this.props.handleClose();
  };

  render() {
    return (
      <div className="bg-modal">
        <div className="modal-content-stopwatch">
          <div className="close" onClick={this.props.handleClose}>
            +
          </div>
          <label id="timer"> {this.state.time}s </label>
          <ButtonToolbar id="timer-buttons">
            {this.state.running ? (
              <Button bsStyle="danger" bsSize="large" onClick={this.stopClock}>
                Stop
              </Button>
            ) : (
              <Button
                bsStyle="success"
                bsSize="large"
                onClick={this.startClock}
              >
                Start
              </Button>
            )}
            <Button bsStyle="warning" bsSize="large" onClick={this.handleClear}>
              Clear
            </Button>
            <Button bsStyle="primary" bsSize="large" onClick={this.logTime}>
              Log Time
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
