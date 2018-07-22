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
  render() {
    return (
      <div className="painter">
        <div className="commandBarContainer">
          <CommandBar {...this.props} />
        </div>
        <div className="boardContainer">
          <Board {...this.props} />
        </div>
      </div>
    );
  }
}
