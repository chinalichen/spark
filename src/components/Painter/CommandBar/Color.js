import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import Dropdown from '../../Dropdown';

export default class Color extends Component {
  constructor(props) {
    super(props);
    this.state = { color: '#000' };
    this.handleColorChange = this.handleColorChange.bind(this);
  }
  handleColorChange({ hex }) {
    this.setState({ color: hex });
  }
  render() {
    return (
      <div>
        <Dropdown trigger={
          <div>
            color
            <div style={{ width: '1.5rem', height: '1rem', backgroundColor: this.state.color }}></div>
          </div>
        }>
          <CompactPicker color={this.state.color} onChangeComplete={this.handleColorChange} />
        </Dropdown>
      </div>
    );
  }
}