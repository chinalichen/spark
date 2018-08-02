import React, { Component } from 'react';
import { getDocs, createDoc } from '../../services/doc';
import { generateID } from '../../utils/id';
import Doc from './Doc';

export default class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = { docs: [] };
    this.createNewDoc = this.createNewDoc.bind(this);
  }
  componentDidMount() {
    getDocs().then(({ data: docs }) => {
      this.setState({ docs });
    });
  }
  createNewDoc() {
    const doc = { id: generateID(), name: `spark${this.state.docs.length + 1}` };
    const docs = this.state.docs.concat(doc);
    createDoc(doc).then(() => {
      this.setState({ docs });
      // goto designer/doc.id
    })
  }
  render() {
    const docs = this.state.docs;
    if (docs.length === 0) {
      return <div onClick={this.createNewDoc}>create one</div>;
    }
    return (
      <div>
        {
          docs.map(doc => <Doc doc={doc} key={doc.id} />)
        }
      </div>
    );
  }
}
