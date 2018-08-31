import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import BrowserRouter from 'react-router-dom/BrowserRouter';
// import Docs from './components/Docs/Docs';
// import About from './components/About/About';
// import Designer from './components/Designer/Designer';

import 'antd/dist/antd.css';
import './App.css';
import asyncComponent from './components/AsyncComponent';

const AsyncDocs = asyncComponent(() => import('./components/Docs/Docs'));
const AsyncDesigner = asyncComponent(() => import('./components/Designer/Designer'));
const AsyncAbout = asyncComponent(() => import('./components/About/About'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={AsyncDocs} />
          <Route path="/designer/:docID" component={AsyncDesigner} />
          <Route path="/about" component={AsyncAbout} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
