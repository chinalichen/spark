import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edit from './Edit';
import Image from './Image';
import Tools from './Tools';
import Shapes from './Shapes';
import Size from './Size';
import Color from './Color';
import Separator from './Separator';
import './CommandBar.css';

export default class CommandBar extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    onSettingsChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleShapeChange = this.handleShapeChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }
  handleSettingChange(partialSettings) {
    if (this.props.onSettingsChange) {
      this.props.onSettingsChange({ ...this.props.settings, ...partialSettings });
    }
  }
  handleShapeChange(shape) {
    this.handleSettingChange({ shape });
  }
  handleSizeChange(size) {
    this.handleSettingChange({ size })
  }
  handleColorChange(color) {
    this.handleSettingChange({ color });
  }
  render() {
    const { color, size, shape } = this.props.settings;
    return (
      <div className="commandBar">
        <Edit />
        <Separator />
        <Image />
        <Separator />
        <Tools />
        <Separator />
        <Shapes shape={shape} onShapeChange={this.handleShapeChange} />
        <Separator />
        <Size size={size} onSizeChange={this.handleSizeChange} />
        <Separator />
        <Color color={color} onColorChange={this.handleColorChange} />
        <div className="blank"></div>
      </div>
    );
  }
}
