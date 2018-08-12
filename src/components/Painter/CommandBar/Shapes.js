import React, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';

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
        <Menu.Item onClick={this.handleShapeClick.bind(this, 'Pencil')}>Pencil</Menu.Item>
        <Menu.Item onClick={this.handleShapeClick.bind(this, 'Eraser')}>Eraser</Menu.Item>
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
