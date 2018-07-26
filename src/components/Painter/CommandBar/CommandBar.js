import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edit from './Edit';
import Image from './Image';
import Tools from './Edit';
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
    this.handleColorChange = this.handleColorChange.bind(this);
  }
  handleSettingChange(partialSettings) {
    if (this.props.onSettingsChange) {
      this.props.onSettingsChange({ ...this.props.settings, ...partialSettings });
    }
  }
  handleColorChange(color) {
    this.handleSettingChange({ color });
  }
  render() {
    const { color } = this.props.settings;
    return (
      <div className="commandBar">
        <Edit />
        <Separator />
        <Image />
        <Separator />
        <Tools />
        <Separator />
        <Shapes />
        <Separator />
        <Size />
        <Separator />
        <Color color={color} onColorChange={this.handleColorChange} />
        <div className="blank"></div>
      </div>
    );
  }
}
