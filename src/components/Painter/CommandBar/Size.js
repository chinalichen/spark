import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import InputNumber from 'antd/lib/input-number';

import 'antd/es/menu/style/index.css';
import 'antd/es/dropdown/style/index.css';
import 'antd/es/input-number/style/index.css';

export default class Size extends Component {
  static propTypes = {
    size: PropTypes.number,
    onSizeChange: PropTypes.func,
  };
  handleSizeChange(size) {
    this.props.onSizeChange(size);
  }
  getSize() {
    return this.props.size || 2;
  }
  getSizeMenu() {
    return (
      <Menu>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 2)}>2</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 4)}>4</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 6)}>6</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 8)}>8</Menu.Item>
        <Menu.Item onClick={this.handleSizeChange.bind(this, 10)}>10</Menu.Item>
        <InputNumber min={1} max={100} defaultValue={this.getSize()} onChange={this.handleSizeChange.bind(this)} />
      </Menu>
    );
  }
  render() {
    return (
      <div className="section">
        Size
        <div>
          <Dropdown overlay={this.getSizeMenu()}>
            <a>{this.getSize()}</a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
