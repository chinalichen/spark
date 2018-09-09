import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import Separator from './Separator';
import { FormattedMessage } from 'react-intl';

export default class Edit extends Component {
  static propTypes = {
    undo: PropTypes.func,
    redo: PropTypes.func,
  };
  render() {
    return (
      <div className="section edit">
        <FormattedMessage id="app.designer.commands.edit" />
        <div className="horizontalIcons">

          <FormattedMessage id="app.designer.commands.edit.undo">
            {text => <a title={text} onClick={this.props.undo}><Icon type="rollback" /></a>}
          </FormattedMessage>
          <Separator />
          <FormattedMessage id="app.designer.commands.edit.redo">
            {text => <a title={text} onClick={this.props.redo}><Icon type="rollback" style={{ transform: 'scaleX(-1)' }} /></a>}
          </FormattedMessage>
        </div>
      </div>
    );
  }
}
