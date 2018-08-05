import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommandBar from './CommandBar';
import Board from './Board';

import './Painter.css';

export default class Painter extends Component {
  static propTypes = {
    doc: PropTypes.object,
    // onDocChange: PropTypes.func,
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
    return { shape: 'path', size: 2, color: 'black' };
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
        <div className="commandBarContainer">
          <CommandBar settings={settings} onSettingsChange={this.handleSettingsChange} />
        </div>
        <div className="boardContainer">
          <Board
            doc={this.props.doc}
            settings={settings}
            onDocChange={this.props.onDocChange}
            onCreateShapes={this.props.onCreateShapes}
          />
        </div>
      </div>
    );
  }
}
