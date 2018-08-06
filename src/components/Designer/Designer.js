import React, { Component } from 'react';
import Painter from "../Painter";
import { createShapes, getShapes } from '../../services/shape';
import { updateDoc, getDoc } from '../../services/doc';

export default class Designer extends Component {
  constructor() {
    super();
    this.state = { doc: { shapes: [] } };

    this.handleCreateShapes = this.handleCreateShapes.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }
  getDocID() {
    return this.props.match.params.docID;
  }
  componentDidMount() {
    const d = getDoc(this.getDocID());
    const s = getShapes(this.getDocID());
    Promise.all([d, s]).then(([{ data: doc }, { data: shapes }]) => {
      this.setState({ doc: { ...doc, shapes } });
    });
    this.ws = new WebSocket('ws://localhost:3000/api/ws', 'ws');
    this.ws.addEventListener('message', function (data) {
      console.log('websocket -------', data);
    });
  }
  handleCreateShapes(shapes) {
    const doc = {
      ...this.state.doc,
      shapes: this.state.doc.shapes.concat(shapes),
    };
    this.setState({ doc });
    createShapes(this.getDocID(), shapes);
  }
  handleSettingsChange(settings) {
    const doc = {
      ...this.state.doc,
      settings,
    };
    this.setState({ doc });
    updateDoc(doc);
  }
  render() {
    return (
      <Painter doc={this.state.doc} onSettingsChange={this.handleSettingsChange} onCreateShapes={this.handleCreateShapes} />
    );
  }
}
