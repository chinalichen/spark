import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Painter from "../Painter";
import { getShapes } from '../../services/shape';
import { getDoc, trackDoc, untrackDoc, uploadDocThumbnail } from '../../services/doc';
import { wsUrl } from '../../utils/url';

import 'antd/es/icon/style/css';
import './Designer.css';
import ActionManager from '../../utils/ActionManager';
import { CreateShapesAction, UpdateSettingsAction, CreateShapesSyncDisabledAction, DeleteShapesSyncDisabledAction } from '../../utils/Actions';
import { notificationHandler } from './NotificationHandler';
import { generateThumbnail } from '../../utils/thumbnail';

export default class Designer extends Component {
  constructor(props) {
    super(props);

    this.actionManager = null;
    this.state = { doc: { id: props.match.params.docID, shapes: [] }, loading: true };

    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.handleCreateShapes = this.handleCreateShapes.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }
  initActionManager(doc) {
    this.actionManager = new ActionManager(doc);
    this.actionManager.onChange = changedDoc => this.setState({ doc: changedDoc });
  }
  getDocID() {
    return this.props.match.params.docID;
  }
  componentDidMount() {
    const docID = this.getDocID();
    Promise
      .all([getDoc(docID), getShapes(docID)])
      .then(([{ data: doc }, { data: shapes }]) => {
        const merged = { ...doc, shapes };
        this.initActionManager(merged);
        this.setState({ doc: merged, loading: false });
      });

    trackDoc(docID);

    this.ws = new WebSocket(wsUrl(), 'ws');
    this.ws.addEventListener('message', (evt) => notificationHandler(docID, this.actionManager, evt));

    document.body.addEventListener('touchmove', e => e.preventDefault());
  }
  componentWillUnmount() {
    const [docID, name] = [this.getDocID, this.state.doc.name];
    untrackDoc(docID);
    this.ws.close();
    if (this.actionManager && this.actionManager.hasActions()) {
      const svgElem = document.getElementById('presenterSvg');
      generateThumbnail(svgElem, name, file => uploadDocThumbnail(docID, [file]));
    }
  }
  handleCreateShapes(shapes) {
    const action = new CreateShapesAction(shapes);
    this.actionManager.executeAction(action);
  }
  handleSettingsChange(settings) {
    const action = new UpdateSettingsAction(settings);
    this.actionManager.executeAction(action);
  }
  undo() {
    if (this.actionManager) {
      this.actionManager.undo();
    }
  }
  redo() {
    if (this.actionManager) {
      this.actionManager.redo();
    }
  }
  render() {
    return (
      <div className="designer">
        <Painter
          doc={this.state.doc}
          undo={this.undo}
          redo={this.redo}
          onSettingsChange={this.handleSettingsChange}
          onCreateShapes={this.handleCreateShapes}
        />
        {this.state.loading && (
          <div className="loadingContainer">
            <Icon type="loading" />
          </div>
        )}
      </div>
    );
  }
}
