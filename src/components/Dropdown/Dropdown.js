import React, { Component } from 'react';
import Portal from '../Portal';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { shown: false };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.hideDropdown);
    document.addEventListener('touchend', this.hideDropdown);
    document.addEventListener('scroll', this.hideDropdown);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.hideDropdown);
    document.removeEventListener('touchend', this.hideDropdown);
    document.removeEventListener('scroll', this.hideDropdown);
  }
  hideDropdown(evt) {
    if (!this.state.shown) {
      return;
    }

    const clickMyself = [this.trigger, this.container].some(e => e.contains(evt.target))
    if (!clickMyself) {
      this.setState({ shown: false });
    }
  }
  showDropdown(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const { bottom, left } = this.trigger.getBoundingClientRect();
    this.setState({ shown: true, x: left, y: bottom });
  }
  render() {
    return (
      <div>
        <div ref={ele => this.trigger = ele} onClick={this.showDropdown}>{this.props.trigger}</div>
        {this.state.shown &&
          <Portal>
            <div ref={ele => this.container = ele} style={{ top: this.state.x, left: this.state.y, position: 'absolute' }}>
              {this.props.children}
            </div>
          </Portal>
        }
      </div>
    );
  }
}
