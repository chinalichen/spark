import React, { Component } from 'react';
import Painter from "../Painter";
import { createShapes, getShapes } from '../../services/shape';
import { updateDoc, getDoc, trackDoc, untrackDoc } from '../../services/doc';
import { wsUrl } from '../../utils/url';

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
    const self = this;
    const docID = this.getDocID();
    const d = getDoc(docID);
    const s = getShapes(docID);
    Promise.all([d, s]).then(([{ data: doc }, { data: shapes }]) => {
      this.setState({ doc: { ...doc, shapes } });
    });
    trackDoc(docID);
    this.ws = new WebSocket(wsUrl(), 'ws');
    this.ws.addEventListener('message', function (evt) {
      const json = evt.data;
      if (!json) {
        return;
      }
      const notification = JSON.parse(json);
      if (notification.type === 'createShapes' && (notification.docID === docID)) {
        const shapes = notification.shapes;
        if (shapes && shapes.length > 0) {
          const doc = {
            ...self.state.doc,
            shapes: self.state.doc.shapes.concat(shapes),
          };
          self.setState({ doc });
        }
      }
    });
  }
  componentWillUnmount() {
    untrackDoc(this.getDocID());
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
