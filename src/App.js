import React, { Component } from 'react';
import Painter from './components/Painter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const docJSON = localStorage.getItem('doc');
    this.state = docJSON ? { doc: JSON.parse(docJSON) } : { doc: { shapes: [] } };

    this.handleDocChange = this.handleDocChange.bind(this);
  }
  handleDocChange(doc) {
    this.setState({ doc });
    console.log(doc);
    //localStorage.setItem('doc', JSON.stringify(doc));
  }
  render() {
    const props = {
      shape: 'path',
      size: 3,
      color: 'red',

      doc: this.state.doc,
    };
    return (
      <div className="App">
        <Painter {...props} onDocChange={this.handleDocChange} />
      </div>
    );
  }
}

export default App;
