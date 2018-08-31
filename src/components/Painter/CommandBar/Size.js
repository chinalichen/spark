import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import PropTypes from 'prop-types';

export default class Size extends Component {
  static propTypes = {
    size: PropTypes.number,
    onSizeChange: PropTypes.func,
  };
  handleSizeChange(size) {
    this.props.onSizeChange(size);
  }
  getSizeMenu() {
    return (
      <Menu>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 2)}>2</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 4)}>4</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 6)}>6</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 8)}>8</Menu.Item>
      </Menu>
    );
  }
  render() {
    return (
      <div className="section">
        Size
        <div>
          <Dropdown overlay={this.getSizeMenu()}>
            <a>{this.props.size || 2}</a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
