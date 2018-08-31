import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Separator from './Separator';

export default class Edit extends Component {
  undo() {

  }
  redo() {

  }
  render() {
    return (
      <div className="section">
        Edit
        <div className="horizontalIcons">
          <a title="undo"><Icon type="rollback" /></a>
          <Separator />
          <a title="redo"><Icon type="rollback" style={{ transform: 'scaleX(-1)' }} /></a>
        </div>
      </div>
    );
  }
}
