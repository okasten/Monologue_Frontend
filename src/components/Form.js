import React, { Component } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";

export default class Form extends Component {
  state = {
    character: this.props.currentMonologue.character,
    play: this.props.currentMonologue.play,
    age: this.props.currentMonologue.age,
    genre: this.props.currentMonologue.genre,
    length: this.props.currentMonologue.length,
    script: this.props.currentMonologue.script,
    file: this.props.currentMonologue.file,
    clicked: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="bg-modal">
        <div className="modal-content">
          {this.props.context === "edit" ? (
            <h2>
              Edit "{this.props.currentMonologue.character} from{" "}
              {this.props.currentMonologue.play}"{" "}
            </h2>
          ) : (
            <h2>Add A Monologue</h2>
          )}
          <div className="close" onClick={this.props.handleClose}>
            +
          </div>
          <form>
            <label>Character: </label>
            <input
              type="text"
              name="character"
              placeholder="Character Name"
              value={this.state.character}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label>Play: </label>
            <input
              type="text"
              name="play"
              placeholder="Title of Play"
              value={this.state.play}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label>Age: </label>
            <input
              type="number"
              name="age"
              placeholder="Age of Character"
              value={this.state.age}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label>Length: </label>
            <input
              type="text"
              name="length"
              placeholder="Length of Monologue"
              value={this.state.length}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label>Genre: </label>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={this.state.genre}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label>Monologue: </label>
            <br />
            <textarea
              name="script"
              placeholder="Enter Monologue Here..."
              value={this.state.script}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <input
              id="formControlsFile"
              type="file"
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
