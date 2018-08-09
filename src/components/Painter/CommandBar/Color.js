import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import { Popover } from 'antd';

export default class Color extends Component {
  static propTypes = {
    color: PropTypes.string,
    onColorChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
  }
  handleColorChange({ hex }) {
    if (this.props.onColorChange) {
      this.props.onColorChange(hex);
    }
  }
  render() {
    const color = this.props.color;
    return (
      <div>
        <Popover placement="bottomRight" title="Fore color" content={<CompactPicker color={color} onChangeComplete={this.handleColorChange} />} trigger="click">
          <div>
            color
            <div style={{ width: '1.5rem', height: '1rem', backgroundColor: color }}></div>
          </div>
        </Popover>
      </div>
    );
  }
}
