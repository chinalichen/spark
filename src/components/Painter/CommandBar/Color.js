import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompactPicker from 'react-color/lib/Compact';
import Popover from 'antd/lib/popover';

import 'antd/es/popover/style/index.css';
import { FormattedMessage } from 'react-intl';

export default class Color extends Component {
  static propTypes = {
    foreColor: PropTypes.string,
    backColor: PropTypes.string,
    onColorChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleForeColorChange = this.handleForeColorChange.bind(this);
    this.handleBackColorChange = this.handleBackColorChange.bind(this);
  }
  handleForeColorChange({ hex }) {
    if (this.props.onColorChange) {
      this.props.onColorChange({ foreColor: hex, backColor: this.props.backColor });
    }
  }
  handleBackColorChange({ hex }) {
    if (this.props.onColorChange) {
      this.props.onColorChange({ foreColor: this.props.foreColor, backColor: hex });
    }
  }
  render() {
    const { foreColor, backColor } = this.props;
    return (
      <div>
        <Popover
          placement="bottomRight"
          title={<FormattedMessage id="app.designer.commands.color.picker" />}
          content={
            <div className="pickerContainer">
              <h1><FormattedMessage id="app.designer.commands.color.fore" /></h1>
              <CompactPicker color={foreColor} onChangeComplete={this.handleForeColorChange} />
              <hr />
              <h1><FormattedMessage id="app.designer.commands.color.back" /></h1>
              <CompactPicker color={backColor} onChangeComplete={this.handleBackColorChange} />
            </div>
          }
          trigger="click">
          <div>
            <FormattedMessage id="app.designer.commands.color" />
            <div className="colorIndicator">
              <div className="back color" style={{ backgroundColor: backColor }}></div>
              <div className="fore color" style={{ backgroundColor: foreColor }}></div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}
