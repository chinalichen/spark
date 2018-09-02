import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import Layout from 'antd/lib/layout';

import 'antd/es/layout/style/index.css';
import './About.css';

export default class About extends Component {
  render() {
    return (
      <div className="aboutContainer">
        <Layout className="layout">
          <Layout.Header className="header">
            <div className="logo">
              <Link to="/">Spark</Link>
            </div>
          </Layout.Header>
          <Layout.Content className="content">
            <p>可以一起创作哦！</p>
          </Layout.Content>
          <Layout.Footer className="footer">
            ©2018 Created by <Link to="/about">Lichen</Link>
          </Layout.Footer>
        </Layout>
      </div >
    );
  }
}
