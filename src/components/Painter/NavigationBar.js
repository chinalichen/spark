import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Link from 'react-router-dom/Link';
import './NavigationBar.css';
import 'antd/es/icon/style/css';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <div className="goHomeBtn">
          <Link to="/">
            <Icon type="home" />
          </Link>
          <div className="split"></div>
        </div>
      </div>
    );
  }
}
