import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import Link from 'react-router-dom/Link';

export default class FooterBar extends Component {
  render() {
    return (
      <Layout.Footer className="footerBar">
        ©2018 Created by <Link to="/about">Lichen</Link>
      </Layout.Footer>
    );
  }
}