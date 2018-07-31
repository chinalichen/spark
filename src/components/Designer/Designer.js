import React, { Component } from 'react';
import Painter from "../Painter";
import { createShapes } from '../../services/shape';

export default class Designer extends Component {
  constructor() {
    super();
    this.state = { doc: { shapes: [] } };

    this.handleDocChange = this.handleDocChange.bind(this);
  }
  componentWillMount() {

  }
  handleDocChange(doc) {
    this.setState({ doc });
    console.log(doc);
  }
  handleCreateShapes(shapes) {
    const doc = {
      ...this.state.doc,
      shapes: this.state.doc.shapes.concat(shapes),
    };
    this.setState({ doc });
    createShapes(doc.id, shapes);
  }
  render() {
    return (
      <Painter doc={this.state.doc} onDocChange={this.handleDocChange} onCreateShapes={this.handleCreateShapes} />
    );
  }
}
