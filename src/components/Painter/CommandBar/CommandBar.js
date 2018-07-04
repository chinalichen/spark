import React, { Component } from 'react';
import Edit from './Edit';
import Image from './Image';
import Tools from './Edit';
import Shapes from './Shapes';
import Size from './Size';
import Color from './Color';
import Separator from './Separator';
import './CommandBar.css';

export default class CommandBar extends Component {
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
        <Color />
        <div className="blank"> </div>
      </div>
    );
  }
}
