import React, { Component } from 'react';
import CommandBtn from './CommandBtn';

export default class CommandBar extends Component {
  render() {
    return (
      <div className="commandBar">
        <Edit />
        <Image />
        <Tools />
        <Shapes />
        <Size />
        <Color />
      </div>
    );
  }
}
