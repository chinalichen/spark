import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Menu from 'antd/lib/menu';
// import Dropdown from 'antd/lib/dropdown';
import Search from 'antd/lib/input/Search';
import 'antd/es/menu/style/index.css';
// import 'antd/es/dropdown/style/index.css';

import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';

export default class TopBar extends Component {
  static propTypes = {
    doc: PropTypes.object,
    onDelete: PropTypes.func,
  };
  getDocMoreActions(doc) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.props.deleteDoc(doc)}>
          Delete
        </Menu.Item>
      </Menu>
    );
  }
  render() {
    const doc = this.props.doc;
    return (
      <Layout.Header className="topBar">
        <div className="logo">
          <Link to="/">Spark</Link>
        </div>
        <div className="commandsContainer">
          <div className="commands">
            <Button type="primary" icon="plus" className="create command">Create</Button>
            <Search
              className="command"
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
            {/* <Dropdown
              className="command"
              overlay={this.getDocMoreActions(doc)}
            >
              <a className="ant-dropdown-link">
                <Icon type="user" />Lichen
              </a>
            </Dropdown> */}
          </div>
        </div>
      </Layout.Header>
    );
  }
}