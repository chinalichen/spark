import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

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
