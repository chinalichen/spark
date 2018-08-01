import React, { Component } from 'react';

export default class Doc extends Component {
  constructor(props) {
    super(props);
    this.state = { docs: [] };
  }
  render() {
    const doc = this.props.doc;
    if (!doc) {
      return <div>no doc</div>;
    }
    return (
      <div>
        <div>{doc.name}</div>
        <div>create at: {doc.createTime}</div>
        <div>modify at: {doc.modifyTime}</div>
      </div>
    );
  }
}
