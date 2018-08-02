import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <div><Link to={`/designer/${doc.id}`}>{doc.id}</Link></div>
        <div>create at: {doc.createTime}</div>
        <div>modify at: {doc.modifyTime}</div>
      </div>
    );
  }
}
