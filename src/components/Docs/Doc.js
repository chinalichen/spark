import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import Dropdown from 'antd/lib/dropdown';
import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/css';
import 'antd/es/divider/style/index.css';
import 'antd/es/dropdown/style/index.css';
import { FormattedRelative } from 'react-intl';

export default class Doc extends Component {
  static propTypes = {
    doc: PropTypes.object,
    onDelete: PropTypes.func,
  };
  getDocMoreActions(doc) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.props.onDelete(doc)}>
          <Icon type="edit" />Rename
        </Menu.Item>
        <Menu.Item onClick={() => this.props.onDelete(doc)}>
          <Icon type="delete" />Delete
        </Menu.Item>
      </Menu>
    );
  }
  goToDoc(id) {
    this.setState({ redirect: `/designer/${id}` });
  }
  render() {
    if (this.state && this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    const doc = this.props.doc;
    return (
      <div className="doc">
        <div className="clickable" onClick={this.goToDoc.bind(this, doc.id)}>
          <img
            className="thumbnail"
            alt="Thumbnail of this spark"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535823280304&di=9ed6c95379d5a016be9bf32d97f6bcfb&imgtype=0&src=http%3A%2F%2Fm.link27.com%2Fdata%2Fnews%2Fjbh%2F1n2iyfwgt02.jpg"
          />
          <div className="meta">
            <a>
              <span className="name">{doc.name}</span><br />
              <i className="description"><FormattedRelative value={doc.modifyTime} /></i>
            </a>
          </div>
        </div>
        <div className="commands">
          <span>
            <a><Icon type="share-alt" /> Share</a>
            <Divider type="vertical" />
            <Dropdown overlay={this.getDocMoreActions(doc)}>
              <a className="ant-dropdown-link"><Icon type="ellipsis" /></a>
            </Dropdown>
          </span>
        </div>
      </div >
    );
  }
}