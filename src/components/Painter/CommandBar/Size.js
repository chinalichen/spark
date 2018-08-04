import React, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';

export default class Size extends Component {
  static propTypes = {
    size: PropTypes.number,
    onSizeChange: PropTypes.func,
  };
  getSizeMenu() {
    return (
      <Menu>
        <Menu.Item>2</Menu.Item>
        <Menu.Item>4</Menu.Item>
        <Menu.Item>6</Menu.Item>
        <Menu.Item>8</Menu.Item>
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
