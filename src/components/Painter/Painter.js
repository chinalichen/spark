import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';
import CommandBar from './CommandBar';
import Board from './Board';

import './Painter.css';

export default class Painter extends Component {
  static propTypes = {
    doc: PropTypes.object,
    onSettingsChange: PropTypes.func,
    onCreateShapes: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }
  getSettings() {
    if (this.props.doc && this.props.doc.settings) {
      return this.props.doc.settings;
    }
    return { shape: 'Pencil', size: 2, foreColor: 'black', backColor: 'white' };
  }
  handleSettingsChange(settings) {
    if (this.props.onSettingsChange) {
      this.props.onSettingsChange(settings);
    }
  }
  render() {
    const settings = this.getSettings();
    return (
      <div className="painter">
        <div className="topBar">
          <NavigationBar />
          <div className="title">
            <b>{this.props.doc.name}</b>
          </div>
          <CommandBar settings={settings} onSettingsChange={this.handleSettingsChange} />
        </div>
        <div className="boardContainer">
          <Board
            doc={this.props.doc}
            settings={settings}
            onSettingsChange={this.handleSettingsChange}
            onCreateShapes={this.props.onCreateShapes}
          />
        </div>
      </div>
    );
  }
}
