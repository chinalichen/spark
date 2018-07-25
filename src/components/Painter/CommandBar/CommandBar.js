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
    onSettingsChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    
  }
  render() {
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
        <Color handleColorChange={this.handleColorChange} />
        <div className="blank"> </div>
      </div>
    );
  }
}
