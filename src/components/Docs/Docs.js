import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Dropdown from 'antd/lib/dropdown';
import Search from 'antd/lib/input/Search';
import Layout from 'antd/lib/layout';

import { getDocs, createDoc, deleteDoc } from '../../services/doc';
import { generateID } from '../../utils/id';
import { FormattedRelative } from 'react-intl';
import Doc from './Doc';
import TopBar from './TopBar';
import FooterBar from './FooterBar';

import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/css';
import 'antd/es/list/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/divider/style/index.css';
import 'antd/es/dropdown/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/layout/style/index.css';

import './Docs.css';

export default class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = { docs: [] };
    this.createNewDoc = this.createNewDoc.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
  }
  componentDidMount() {
    getDocs().then(({ data: docs }) => {
      this.setState({ docs });
    });
  }
  createNewDoc() {
    const doc = { id: generateID(), name: `spark${this.state.docs.length + 1}`, modifyTime: new Date() };
    const docs = this.state.docs.concat(doc);
    createDoc(doc).then(() => {
      this.setState({ docs });
      // goto designer/doc.id
    })
  }
  deleteDoc(doc) {
    deleteDoc(doc.id).then(() => {
      this.setState({ docs: this.state.docs.filter(d => d.id !== doc.id) });
    });
  }
  getDocMoreActions(doc) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.deleteDoc(doc)}>
          Delete
        </Menu.Item>
      </Menu>
    );
  }
  render() {
    const docs = this.state.docs.map(doc => ({ ...doc, key: doc.id }));
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, doc) => <a href={`/designer/${doc.id}`} >{text}</a>,
    }, {
      title: 'Last modified',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      render: date => <FormattedRelative value={date} />,
    }, {
      title: 'Action',
      key: 'action',
      render: (text, doc) => (
        <span>
          <a>Share</a>
          <Divider type="vertical" />
          <Dropdown overlay={this.getDocMoreActions(doc)}>
            <a className="ant-dropdown-link">
              <Icon type="ellipsis" />
            </a>
          </Dropdown>
        </span>
      ),
    }];
    return (
      <div className="docsContainer">
        <Layout className="layout">
          <TopBar />
          <Layout.Content className="docList">
            <div style={{ background: '#fff', minHeight: 280 }}>
              <Button className="create" type="primary" onClick={this.createNewDoc}><Icon type="plus" /> Create</Button>
              <List
                itemLayout="horizontal"
                dataSource={docs}
                renderItem={doc => <List.Item><Doc doc={doc} onDelete={this.deleteDoc} /></List.Item>}
              />
            </div>
          </Layout.Content>
          <FooterBar />
        </Layout>
      </div>
    );
  }
}
