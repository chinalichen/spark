import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasXY, solve } from './utils';
import Point from './modules/Point';
import Path from './modules/Path';
import Context from './modules/Context';
import { createShape } from './modules/ShapeCreator';

import './Board.css';

export default class Painter extends Component {
  static propTypes = {
    shape: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,

    doc: PropTypes.object,

    onDocChange: PropTypes.func,
  };
  constructor(props) {
    super(props);

    const ctx = new Context();
    ctx.foreColor = props.color;
    ctx.size = props.size;
    ctx.shape = props.shape;

    this.count = props.doc.shapes.length;
    this.points = null;
    this.state = { paths: [], currentPaths: [], context: ctx };

    this.handleDrawStart = this.handleDrawStart.bind(this);
    this.handleDrawMove = this.handleDrawMove.bind(this);
    this.handleDrawEnd = this.handleDrawEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
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
  handleTouchStart(evt) {
    Array.from(evt.changedTouches).map(hasXY).forEach(te => this.updatePoints(te.identifier, te.clientX, te.clientY));
    this.updateCurrentPath();
  }
  handleDrawMove(evt) {
    if (!this.hasPoints()) {
      return;
    }
    this.updatePoints(0, evt.clientX, evt.clientY);
    this.updateCurrentPath();
  }
  handleTouchMove(evt) {
    if (!this.hasPoints()) {
      return;
    }
    Array.from(evt.changedTouches).map(hasXY).forEach(te => this.updatePoints(te.identifier, te.clientX, te.clientY));
    this.updateCurrentPath();
  }
  handleDrawEnd(evt) {
    if (!this.hasPoints()) {
      return;
    }
    this.updatePoints(0, evt.clientX, evt.clientY);
    const shapeTypes = [Point, Path];
    const [matched] = shapeTypes.filter(s => s.test(this.pointsList[0]));
    const shape = new matched(this.pointsList[0], this.state.context);
    const shapes = this.props.doc.shapes.concat(shape.toJSON());
    this.props.onDocChange({ ...this.props.doc, shapes });
    this.pointsList = null;
    this.setState({ currentPaths: [] });
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
    const shapes = this.props.doc.shapes.map(s => createShape(s)).map(s => s.elem);
    return (
      <div className="board">
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
            {shapes}
          </svg>
          <svg className="svgDrawing">
            {this.state.currentPaths.map(({ key, d, ...styles }) => <path key={key} d={d} style={{ ...styles }} />)}
          </svg>
        </div>
      </div>
    );
  }
}
