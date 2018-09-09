import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Link from 'react-router-dom/Link';
import './NavigationBar.css';
import 'antd/es/icon/style/css';
import { FormattedMessage } from 'react-intl';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <FormattedMessage id="app.designer.go.home">
          {text => (
            <div className="goHomeBtn" title={text}>
              <Link to="/">
                <Icon type="home" />
              </Link>
              <div className="split"></div>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}
