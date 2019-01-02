import React, { Component } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";

export default class Form extends Component {
  state = {
    character: this.props.monologue.character,
    play: this.props.monologue.play,
    age: this.props.monologue.age,
    genre: this.props.monologue.genre,
    length: this.props.monologue.length,
    script: this.props.monologue.script,
    file: this.props.monologue.file,
    clicked: false
  };
  componentDidMount() {
    console.log(this.state);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="bg-modal-monologue">
        <div className="modal-content-monologue">
          {this.props.context === "edit" ? (
            <h2>
              Edit {this.props.monologue.character} from{" "}
              {this.props.monologue.play}{" "}
            </h2>
          ) : (
            <h2>Add A Monologue</h2>
          )}
          <div className="close" onClick={this.props.handleClose}>
            +
          </div>
          <form className="newMonologue">
            <label>Character: </label>
            <input
              type="text"
              name="character"
              placeholder="Character Name"
              value={this.state.character}
              onChange={event => this.handleChange(event)}
            />
            <label>Play: </label>
            <input
              type="text"
              name="play"
              placeholder="Title of Play"
              value={this.state.play}
              onChange={event => this.handleChange(event)}
            />
            <label>Age: </label>
            <input
              type="number"
              name="age"
              placeholder="Age of Character"
              value={this.state.age}
              onChange={event => this.handleChange(event)}
            />

            <label>Length: </label>
            <input
              type="text"
              name="length"
              placeholder="Length of Monologue"
              value={this.state.length}
              onChange={event => this.handleChange(event)}
            />

            <label>Genre: </label>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={this.state.genre}
              onChange={event => this.handleChange(event)}
            />

            <label>Monologue: </label>
            <br />

            <textarea
              name="script"
              placeholder="Enter Monologue Here..."
              value={this.state.script}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label> File URL </label>

            <input
              id="formControlsFile"
              type="text"
              label="File"
              help="Example block-level help text here."
            />

            <br />
            <ButtonToolbar>
              <Button
                bsSize="large"
                bsStyle="success"
                block
                onClick={e =>
                  this.props.handleSubmit(
                    e,
                    this.state,
                    this.props.currentMonologue
                  )
                }
              >
                {" "}
                Submit{" "}
              </Button>
            </ButtonToolbar>
          </form>
        </div>
      </div>
    );
  }
}
