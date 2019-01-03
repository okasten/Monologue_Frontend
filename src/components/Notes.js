import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class Notes extends Component {
  state = {
    editClick: false,
    newNotes: this.props.monologue.notes
  };

  handleEdit = e => {
    e.preventDefault();
    this.setState({
      editClick: !this.state.editClick
    });
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      newNotes: e.target.value
    });
  };

  handleSubmit = e => {
    this.setState({
      editClick: !this.state.editClick
    });
    this.props.handlePatch(e, {
      ...this.props.monologue,
      notes: this.state.newNotes
    });
  };
  render() {
    return (
      <div className="bg-modal">
        <div className="modal-content-share">
          <div className="close" onClick={this.props.handleClose}>
            +
          </div>
          <h1> Notes for {this.props.monologue.character}</h1>
          {this.state.editClick ? (
            <Form>
              <input
                onChange={this.handleChange}
                type="textarea"
                placeholder={this.props.monologue.notes}
                value={this.state.newNotes}
              />
              <Button onClick={this.handleSubmit}> Update Notes </Button>
            </Form>
          ) : (
            <div>
              <p>{this.props.monologue.notes}</p>
              <Button onClick={this.handleEdit}> Edit Notes </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
