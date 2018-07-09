import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Painter.css';
import { hasXY, solve, distance } from './utils';
import CommandBar from './CommandBar';

export default class Painter extends Component {
  static propTypes = {
    shape: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,

    doc: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.handleDrawStart = this.handleDrawStart.bind(this);
    this.handleDrawMove = this.handleDrawMove.bind(this);
    this.handleDrawEnd = this.handleDrawEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.state = { paths: [], currentPaths: [] };
    this.points = null;
    this.count = 0;
  }
  hasPoints() {
    if (!this.pointsList) {
      return false;
    }
    return this.pointsList.some(points => points && points.length > 0);
  }
  updatePoints(idx, x, y) {
    if (!this.pointsList) {
      this.pointsList = [];
    }
    this.pointsList[idx] = (this.pointsList[idx] || []).concat([x - this.canvasRect.x, y - this.canvasRect.y]);
  }
  updateCurrentPath() {
    if (this.hasPoints()) {
      this.setState({
        currentPaths: this.pointsList.map((ps, i) => ({
          d: solve(ps),
          key: i,
          stroke: this.props.color,
          strokeWidth: this.props.size,
          fill: 'none',
        }))
      });
    }
  }
  handleDrawStart(evt) {
    this.updatePoints(0, evt.clientX, evt.clientY);
    this.updateCurrentPath();
  }
  handleDrawMove(evt) {
    if (!this.hasPoints()) {
      return;
    }
    this.updatePoints(0, evt.clientX, evt.clientY);
    this.updateCurrentPath();
  }
  handleDrawEnd(evt) {
    if (!this.hasPoints()) {
      return;
    }
    this.updatePoints(0, evt.clientX, evt.clientY);
    const d = solve(this.pointsList[0], 1);
    this.pointsList = null;
    const paths = this.state.paths.concat({
      key: (this.count += 1),
      d,
      stroke: this.props.color,
      strokeWidth: this.props.size,
      fill: 'none',
    });
    this.setState({ paths, currentPaths: [] });
  }
  handleTouchStart(evt) {
    Array.from(evt.changedTouches).forEach((te) => {
      if (hasXY(te)) {
        this.updatePoints(te.identifier, te.clientX, te.clientY);
      }
    });
  }
  handleTouchMove(evt) {
    if (!this.hasPoints()) {
      return;
    }
    Array.from(evt.changedTouches).forEach((te) => {
      if (hasXY(te)) {
        this.updatePoints(te.identifier, te.clientX, te.clientY);
      }
    });
    this.updateCurrentPath();
  }
  handleTouchEnd(evt) {
    if (!this.hasPoints()) {
      return;
    }
    const ds = Array.from(evt.changedTouches).map((te) => {
      if (hasXY(te)) {
        this.updatePoints(te.identifier, te.clientX, te.clientY);
      }
      const points = this.pointsList[te.identifier];
      this.pointsList[te.identifier] = null;
      return {
        key: (this.count += 1),
        d: solve(points, 1),
        stroke: this.props.color,
        strokeWidth: this.props.size,
        fill: 'none',
      };
    });
    const paths = this.state.paths.concat(ds);
    this.setState({ paths });
  }
  componentDidMount() {
    this.canvasRect = this.canvasElem.getBoundingClientRect();
  }
  render() {
    return (
      <div className="painter-container">
        <CommandBar />
        <div
          ref={elem => { this.canvasElem = elem }}
          className="canvas"
          role="presentation"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onMouseDown={this.handleDrawStart}
          onMouseMove={this.handleDrawMove}
          onMouseUp={this.handleDrawEnd}
        >
          <svg className="svgDrawing">
            {this.state.paths.map(({ key, d, ...styles }) => (<path key={key} d={d} style={{ ...styles }} />))}
          </svg>
          <svg className="svgDrawing">
            {this.state.currentPaths.map(({ key, d, ...styles }) => <path key={key} d={d} style={{ ...styles }} />)}
          </svg>
        </div>
      </div>
    );
  }
}
