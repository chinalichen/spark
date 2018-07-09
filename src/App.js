import React, { Component } from 'react';
import Painter from './components/Painter';
import './App.css';

class App extends Component {
  render() {
    const props = {
      shape: 'path',
      size: 3,
      color: '#333',
    };
    return (
      <div className="App">
        <Painter {...props} />
      </div>
    );
  }
}

export default App;
