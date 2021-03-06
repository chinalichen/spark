import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Menu from 'antd/lib/menu';
import Search from 'antd/lib/input/Search';
import 'antd/es/menu/style/index.css';

import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import 'antd/es/input/style/index.css';
import { FormattedMessage } from 'react-intl';

export default class TopBar extends Component {
  static propTypes = {
    doc: PropTypes.object,
    onCreateDoc: PropTypes.func,
    onSearchDoc: PropTypes.func,
  };
  render() {
    return (
      <Layout.Header className="topBar">
        <div className="logo">
          <Link to="/"><FormattedMessage id="app.product.name" /></Link>
        </div>
        <div className="commandsContainer">
          <div className="commands">
            <Button type="primary" icon="plus" className="create fixed command" onClick={this.props.onCreateDoc}>
              <span><FormattedMessage id="app.create" /></span>
            </Button>
            <FormattedMessage id="app.search">
              {text => (
                <Search
                  className="command"
                  placeholder={text}
                  onSearch={this.props.onSearchDoc}
                  style={{ width: 200 }}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </Layout.Header>
    );
  }
}
