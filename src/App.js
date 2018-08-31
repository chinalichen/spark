import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Docs from './components/Docs/Docs';
import About from './components/About/About';
import Designer from './components/Designer/Designer';

import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Docs} />
          <Route path="/designer/:docID" component={Designer} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
