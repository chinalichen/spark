import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommandBar from './CommandBar';
import Board from './Board';

import './Painter.css';

export default class Painter extends Component {
  static propTypes = {
    doc: PropTypes.object,
    onDocChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      shape: 'path',
      size: 3,
      color: 'black',
    };
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }
  handleSettingsChange(settings) {
    this.setState(settings);
  }
  render() {
    const settings = {
      shape: this.state.shape,
      size: this.state.size,
      color: this.state.color,
    }
    return (
      <div className="painter">
        <div className="commandBarContainer">
          <CommandBar settings={settings} onSettingsChange={this.handleSettingsChange} />
        </div>
        <div className="boardContainer">
          <Board doc={this.props.doc} settings={settings} onDocChange={this.props.onDocChange} />
        </div>
      </div>
    );
  }
}
