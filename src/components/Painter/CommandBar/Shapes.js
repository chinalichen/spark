import React, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';

export default class Shapes extends Component {
  static propTypes = {
    shape: PropTypes.string,
    onShapeChange: PropTypes.func,
  };
  getMenu() {
    return (
      <Menu>
        <Menu.Item>Pencil</Menu.Item>
        <Menu.Item>Eraser</Menu.Item>
      </Menu>
    );
  }
  render() {
    return (
      <div className="section">
        Shapes
        <div>
          <Dropdown overlay={this.getMenu()}>
            <a>{this.props.shape || 'Pencil'}</a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
