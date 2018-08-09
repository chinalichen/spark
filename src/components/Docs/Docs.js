import React, { Component } from 'react';
import { Table, Icon, Divider, Dropdown, Menu, Button } from 'antd';
import { getDocs, createDoc, deleteDoc } from '../../services/doc';
import { generateID } from '../../utils/id';
import { FormattedRelative } from 'react-intl';

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
    if (this.state.docs.length === 0) {
      return <Button type="primary" onClick={this.createNewDoc}><Icon type="plus" /> Create</Button>;
    }
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
          <a href="javascript:;">Share</a>
          <Divider type="vertical" />
          <Dropdown overlay={this.getDocMoreActions(doc)}>
            <a href="javascript:;" className="ant-dropdown-link">
              <Icon type="ellipsis" />
            </a>
          </Dropdown>
        </span>
      ),
    }];
    return (
      <div>
        <Button type="primary" onClick={this.createNewDoc}><Icon type="plus" /> Create</Button>
        <Table dataSource={docs} columns={columns} />
      </div>
    );
  }
}
