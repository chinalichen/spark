import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasXY, solve } from './utils';
import Point from './modules/Point';
import Path from './modules/Path';
import Context from './modules/Context';
import { createShape } from './modules/ShapeCreator';

import './Board.css';

export default class Board extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      shape: PropTypes.string,
      size: PropTypes.number,
      color: PropTypes.string,
    }),

    doc: PropTypes.object,

    onDocChange: PropTypes.func,
    onCreateShapes: PropTypes.func,
  };
  constructor(props) {
    super(props);

    const ctx = new Context();
    ctx.foreColor = props.settings.color;
    ctx.size = props.settings.size;
    ctx.shape = props.settings.shape;

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
  componentWillReceiveProps(nextProps) {
    const ctx = new Context();
    ctx.foreColor = nextProps.settings.color;
    ctx.size = nextProps.settings.size;
    ctx.shape = nextProps.settings.shape;
    this.setState({ context: ctx });
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
        currentPaths: this.pointsList.filter(ps => ps && ps.length > 0).map((ps, i) => ({
          d: solve(ps),
          key: i,
          stroke: this.props.settings.color,
          strokeWidth: this.props.settings.size,
          strokeLinecap: 'round',
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
    Array.from(evt.changedTouches).filter(hasXY).forEach(te => this.updatePoints(te.identifier, te.clientX, te.clientY));
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
    Array.from(evt.changedTouches).filter(hasXY).forEach(te => this.updatePoints(te.identifier, te.clientX, te.clientY));
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
    this.props.onCreateShapes([shape.meta]);
    // const shapes = this.props.doc.shapes.concat(shape.toJSON());
    // this.props.onDocChange({ ...this.props.doc, shapes });
    this.pointsList = null;
    this.setState({ currentPaths: [] });
  }
  handleTouchEnd(evt) {
    if (!this.hasPoints()) {
      return;
    }
    const shapes = Array.from(evt.changedTouches).map((te) => {
      if (hasXY(te)) {
        this.updatePoints(te.identifier, te.clientX, te.clientY);
      }
      const shapeTypes = [Point, Path];
      const points = this.pointsList[te.identifier];
      const [matched] = shapeTypes.filter(s => s.test(points));
      const shape = new matched(points, this.state.context);
      this.pointsList[te.identifier] = null;
      return shape;
    });
    this.props.onCreateShapes(shapes.map(s => s.meta));
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
