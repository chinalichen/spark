import React, { Component } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
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
        <Menu.Item onClick={this.handleShapeClick.bind(this, 'Pencil')}>
          <Icon type="edit" /> Pencil
        </Menu.Item>
        <Menu.Item onClick={this.handleShapeClick.bind(this, 'Eraser')}>
          <Icon type="laptop" /> Eraser
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
        Shape
        <div>
          <Dropdown overlay={this.getMenu()}>
            <a>{shape}</a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
