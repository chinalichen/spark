import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import Separator from './Separator';

export default class Edit extends Component {
  static propTypes = {
    undo: PropTypes.func,
    redo: PropTypes.func,
  };
  render() {
    return (
      <div className="section edit">
        Edit
        <div className="horizontalIcons">
          <a title="undo" onClick={this.props.undo}>
            <Icon type="rollback" />
          </a>
          <Separator />
          <a title="redo" onClick={this.props.redo}>
            <Icon type="rollback" style={{ transform: 'scaleX(-1)' }} />
          </a>
        </div>
      </div>
    );
  }
}
