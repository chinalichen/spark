import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommandBar from './CommandBar';
import Board from './Board';

import './Painter.css';

export default class Painter extends Component {
  static propTypes = {
    shape: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,

    doc: PropTypes.object,

    onDocChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }
  handleSettingsChange(settings) {
    this.setState(settings);
  }
  render() {
    const boardProps = {
      shape: this.props.shape,
      size: this.props.size,
      color: this.state.color || this.props.color,
    }
    return (
      <div className="painter">
        <div className="commandBarContainer">
          <CommandBar {...this.props} onSettingsChange={this.handleSettingsChange} />
        </div>
        <div className="boardContainer">
          <Board doc={this.props.doc} {...boardProps} onDocChange={this.props.onDocChange} />
        </div>
      </div>
    );
  }
}
