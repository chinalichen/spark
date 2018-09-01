import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Docs from './components/Docs/Docs';
import About from './components/About/About';
import Designer from './components/Designer/Designer';

import stylesheet from 'antd/lib/style/index.css';
import style_badge from 'antd/lib/badge/style/index.css';

import './App.css';
// import asyncComponent from './components/AsyncComponent';

// const Docs = asyncComponent(() => import('./components/Docs/Docs'));
// const Designer = asyncComponent(() => import('./components/Designer/Designer'));
// const About = asyncComponent(() => import('./components/About/About'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: style_badge }} />
          <Route exact path="/" component={Docs} />
          <Route path="/designer/:docID" component={Designer} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
