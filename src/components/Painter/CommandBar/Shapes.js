import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import PropTypes from 'prop-types';

import 'antd/es/menu/style/index.css';
import 'antd/es/dropdown/style/index.css';
import { FormattedMessage } from 'react-intl';

export default class Shapes extends Component {
  static propTypes = {
    shape: PropTypes.string,
    onShapeChange: PropTypes.func,
  };
  handleShapeClick(type) {
    if (this.props.onShapeChange) {
      this.props.onShapeChange(type);
    }
  }
  getMenu() {
    return (
      <Menu>
        <Menu.Item onClick={this.handleShapeClick.bind(this, 'Pencil')}>
          <Icon type="edit" />
          <FormattedMessage id="app.designer.commands.shape.pencil" />
        </Menu.Item>
        <Menu.Item onClick={this.handleShapeClick.bind(this, 'Eraser')}>
          <Icon type="laptop" />
          <FormattedMessage id="app.designer.commands.shape.eraser" />
        </Menu.Item>
      </Menu>
    );
  }
  render() {
    const shape = (this.props.shape || 'Pencil') === 'Pencil'
      ? <Icon type="edit" />
      : <Icon type="laptop" />;

    return (
      <div className="section">
        <FormattedMessage id="app.designer.commands.shape" />
        <div>
          <Dropdown overlay={this.getMenu()}>
            <a>{shape}</a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
