import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import Dropdown from '../../Dropdown';

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
        <Dropdown trigger={
          <div>
            color
            <div style={{ width: '1.5rem', height: '1rem', backgroundColor: color }}></div>
          </div>
        }>
          <CompactPicker color={color} onChangeComplete={this.handleColorChange} />
        </Dropdown>
      </div>
    );
  }
}
