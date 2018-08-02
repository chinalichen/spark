import React, { Component } from 'react';
import Painter from "../Painter";
import { createShapes, getShapes } from '../../services/shape';

export default class Designer extends Component {
  constructor() {
    super();
    this.state = { doc: { shapes: [] } };

    this.handleCreateShapes = this.handleCreateShapes.bind(this);
  }
  getDocID() {
    return this.props.match.params.docID;
  }
  componentDidMount() {
    getShapes(this.getDocID()).then(({ data: shapes }) => {
      this.setState({ doc: { shapes } });
    });
  }
  handleCreateShapes(shapes) {
    const doc = {
      shapes: this.state.doc.shapes.concat(shapes),
    };
    this.setState({ doc });
    createShapes(this.getDocID(), shapes);
  }
  render() {
    return (
      <Painter doc={this.state.doc} onCreateShapes={this.handleCreateShapes} />
    );
  }
}
