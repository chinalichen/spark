import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Painter from "../Painter";
import { getShapes } from '../../services/shape';
import { updateDoc, getDoc, trackDoc, untrackDoc } from '../../services/doc';
import { wsUrl } from '../../utils/url';

import 'antd/es/icon/style/css';
import './Designer.css';
import ActionManager from '../../utils/ActionManager';
import { CreateShapesAction } from '../../utils/Actions';

export default class Designer extends Component {
  constructor() {
    super();
    this.state = { doc: { shapes: [] }, loading: true };
    this.actionManager = new ActionManager(this.state.doc);
    this.actionManager.onChange = doc => this.setState({ doc });

    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
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
      this.setState({ doc: { ...doc, shapes }, loading: false });
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
    const action = new CreateShapesAction(shapes);
    // action.run = () => {
    //   const doc = {
    //     ...this.state.doc,
    //     shapes: this.state.doc.shapes.concat(shapes),
    //   };
    //   this.setState({ doc });
    //   createShapes(this.getDocID(), shapes);
    // };
    this.actionManager.executeAction(action);
    // const doc = {
    //   ...this.state.doc,
    //   shapes: this.state.doc.shapes.concat(shapes),
    // };
    // this.setState({ doc });
    // createShapes(this.getDocID(), shapes);
  }
  handleSettingsChange(settings) {
    const doc = {
      ...this.state.doc,
      settings,
    };
    this.setState({ doc });
    updateDoc(doc);
  }
  undo() {

  }
  redo() {

  }
  render() {
    return (
      <div className="designer">
        {this.state.loading && <Icon type="sync" />}
        <Painter
          doc={this.state.doc}
          undo={this.undo}
          redo={this.redo}
          onSettingsChange={this.handleSettingsChange}
          onCreateShapes={this.handleCreateShapes}
        />
      </div>
    );
  }
}
