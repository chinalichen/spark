import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/css';
import 'antd/es/divider/style/index.css';
import 'antd/es/dropdown/style/index.css';
import { FormattedRelative, FormattedMessage } from 'react-intl';
import QRCode from 'qrcode.react';


export default class Doc extends Component {
  static propTypes = {
    doc: PropTypes.object,
    onDelete: PropTypes.func,
    onRename: PropTypes.func,
  };
  getDocMoreActions(doc) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.props.onRename(doc)}>
          <Icon type="edit" />
          <FormattedMessage id="app.rename" />
        </Menu.Item>
        <Menu.Item onClick={() => this.props.onDelete(doc)}>
          <Icon type="delete" />
          <FormattedMessage id="app.delete" />
        </Menu.Item>
      </Menu>
    );
  }
  getShareDocActions(doc) {
    const url = `${window.location.href}designer/${doc.id}`;
    return (
      <div className="sharePanel">
        <textarea id={doc.id}>{url}</textarea>
        <Button onClick={() => {
          const urlSpan = document.querySelector(`#${doc.id}`);
          urlSpan.select();
          document.execCommand('copy');
        }}>
          <Icon type="copy" />
        </Button>
        <div>
          <QRCode value={url} />
        </div>
      </div>
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
    const newDoc = doc.createTime === doc.modifyTime;
    const thumbnailURL = newDoc ? 'http://m.link27.com/data/news/jbh/1n2iyfwgt02.jpg' : `/images/thumbnails/${doc.id}.png`;
    return (
      <div className="doc">
        <div className="clickable" onClick={this.goToDoc.bind(this, doc.id)}>
          <img
            className="thumbnail"
            alt="Thumbnail of this spark"
            src={thumbnailURL}
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
            <Dropdown overlay={this.getShareDocActions(doc)}>
              <a><Icon type="share-alt" /> <FormattedMessage id="app.share" /></a>
            </Dropdown>
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
