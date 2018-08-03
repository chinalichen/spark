import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Docs from './components/Docs/Docs';
import About from './components/About/About';
import Designer from './components/Designer/Designer';

import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="header">
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/about">About</Link>
          </div>
          <Route exact path="/" component={Docs} />
          <Route path="/designer/:docID" component={Designer} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
