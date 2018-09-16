import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import { getDocs, createDoc, deleteDoc } from '../../services/doc';
import { generateID } from '../../utils/id';
import Doc from './Doc';
import TopBar from './TopBar';
import FooterBar from './FooterBar';

import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/css';
import 'antd/es/list/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/layout/style/index.css';
import './Docs.css';
import { FormattedMessage } from 'react-intl';

export default class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = { docs: [], loading: true };
    this.createNewDoc = this.createNewDoc.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
  }
  componentDidMount() {
    getDocs().then(({ data: docs }) => {
      this.setState({ docs, loading: false });
    });
  }
  createNewDoc() {
    const timestamp = new Date();
    const doc = { id: generateID(), name: `spark${this.state.docs.length + 1}`, createTime: timestamp, modifyTime: timestamp };
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
  getEmptyTextComponent() {
    return (
      <span>
        <FormattedMessage id="app.docs.create.tip.part1" />
        <Button className="inline" type="primary" icon="plus" onClick={this.createNewDoc}>
          <FormattedMessage id="app.create" />
        </Button>
        <FormattedMessage id="app.docs.create.tip.part2" />
      </span>
    );
  }
  render() {
    const docs = this.state.docs.map(doc => ({ ...doc, key: doc.id }));


    return (
      <div className="docsContainer">
        <Layout className="layout">
          <TopBar onCreateDoc={this.createNewDoc} />
          <Layout.Content className="docList">
            <div style={{ background: '#fff' }}>
              {this.state.loading
                ? <Icon type="loading" />
                : <List
                  locale={{ emptyText: this.getEmptyTextComponent() }}
                  itemLayout="horizontal"
                  dataSource={docs}
                  renderItem={doc => <List.Item className="item"><Doc doc={doc} onDelete={this.deleteDoc} /></List.Item>}
                />}
            </div>
          </Layout.Content>
          <FooterBar />
        </Layout>
      </div>
    );
  }
}
