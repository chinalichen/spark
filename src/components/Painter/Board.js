import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { hasXY, solve } from './utils';
import Point from './modules/Point';
import Path from './modules/Path';
import Eraser from './modules/Eraser';
import Context from './modules/Context';
import { createShape } from './modules/ShapeCreator';

import './Board.css';

function updateContext(props) {
  const ctx = new Context();
  ctx.foreColor = props.settings.foreColor;
  ctx.backColor = props.settings.backColor;
  ctx.size = props.settings.size;
  ctx.shape = props.settings.shape;
  return ctx;
}

export default class Board extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      shape: PropTypes.string,
      size: PropTypes.number,
      color: PropTypes.string,
    }),

    doc: PropTypes.object,

    onCreateShapes: PropTypes.func,
    onSettingsChange: PropTypes.func,
  };
  constructor(props) {
    super(props);

    const ctx = updateContext(props);
    this.count = props.doc.shapes.length;
    this.points = null;
    this.state = { paths: [], currentPaths: [], context: ctx };

    this.handleDrawStart = this.handleDrawStart.bind(this);
    this.handleDrawMove = this.handleDrawMove.bind(this);
    this.handleDrawEnd = this.handleDrawEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleCanvasResizeStart = this.handleCanvasResizeStart.bind(this);
    this.handleCanvasResizing = this.handleCanvasResizing.bind(this);
    this.handleCanvasResizeEnd = this.handleCanvasResizeEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const ctx = updateContext(nextProps);
    this.setState({ context: ctx });
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.canvasRect = this.canvasElem.getBoundingClientRect();
    if (this.props.onSettingsChange) {
      this.props.onSettingsChange({ ...this.props.settings, canvasSize: this.canvasRect });
    }
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
    this.updateCanvasRect();
    this.pointsList[idx] = (this.pointsList[idx] || []).concat([x - this.canvasRect.left, y - this.canvasRect.top]);
  }
  updateCurrentPath() {
    if (this.hasPoints()) {
      this.setState({
        currentPaths: this.pointsList.filter(ps => ps && ps.length > 0).map((ps, i) => ({
          d: solve(ps),
          key: i,
          stroke: this.state.context.shape === 'Eraser' ? (this.props.settings.backColor || 'white') : this.props.settings.foreColor,
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
    // const shapeTypes = this.state.context.shape === 'Eraser' ? [Eraser] : [Point, Path];
    // const [matched] = shapeTypes.filter(s => s.test(this.pointsList[0]));
    // const shape = new matched(this.pointsList[0], this.state.context);
    const metas = this.getShapes([0]);
    this.props.onCreateShapes(metas);
    this.pointsList = null;
    this.setState({ currentPaths: [] });
  }
  handleTouchEnd(evt) {
    if (!this.hasPoints()) {
      return;
    }
    const indices = Array.from(evt.changedTouches).map(te => {
      if (hasXY(te)) {
        this.updatePoints(te.identifier, te.clientX, te.clientY);
      }
      return te.identifier;
    });
    const metas = this.getShapes(indices);
    this.props.onCreateShapes(metas);
    indices.forEach(i => (this.pointsList[i] = null));
    this.setState({ currentPaths: this.state.currentPaths.filter((p, i) => !indices.includes(i)) });
    // const shapes = Array.from(evt.changedTouches).map((te) => {
    //   if (hasXY(te)) {
    //     this.updatePoints(te.identifier, te.clientX, te.clientY);
    //   }
    //   const shapeTypes = [Point, Path];
    //   const points = this.pointsList[te.identifier];
    //   const [matched] = shapeTypes.filter(s => s.test(points));
    //   const shape = new matched(points, this.state.context);
    //   this.pointsList[te.identifier] = null;
    //   return shape;
    // });
    // this.props.onCreateShapes(shapes.map(s => s.meta));
  }
  getShapes(indices) {
    const shapeTypes = this.state.context.shape === 'Eraser' ? [Eraser] : [Point, Path];
    const completePointsList = indices.map(i => this.pointsList[i]);
    const matchedTypes = completePointsList.map(points => shapeTypes.find(s => s.test(points)));
    const shapes = matchedTypes.map((t, i) => new t(completePointsList[i], this.state.context));
    const metas = shapes.map(s => s.meta);
    return metas;
  }
  updateCanvasRect() {
    if (!this.canvasRect) {
      this.canvasRect = this.canvasElem.getBoundingClientRect();
      if (get(this.props.settings, 'canvasSize.height') !== this.canvasRect.height
        || get(this.props.settings, 'canvasSize.width') !== this.canvasRect.width) {
        this.props.onSettingsChange({ ...this.props.settings, canvasSize: this.canvasRect })
      }
    }
  }
  handleCanvasResizeStart() {
    this.setState({ resizing: true });
  }
  handleCanvasResizing() {

  }
  handleCanvasResizeEnd() {
    this.setState({ resizing: false });
  }
  render() {
    const shapes = this.props.doc.shapes.map(s => createShape(s)).map(s => s.elem);
    const canvasStyle = {};
    if (this.canvasRect) {
      canvasStyle.height = `${this.canvasRect.height}px`;
      canvasStyle.width = `${this.canvasRect.width}px`;
    }
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
          style={{ ...canvasStyle }}
        >
          <svg className="svgDrawing">
            {shapes}
          </svg>
          <svg className="svgDrawing">
            {this.state.currentPaths.map(({ key, d, ...styles }) => <path key={key} d={d} style={{ ...styles }} />)}
          </svg>
          <div
            className="cornerResizer"
            // style={{ top: this.canvasRect.bottom + 'px', left: this.canvasRect.right + 'px' }}
            onMouseDown={this.handleCanvasResizeStart}
            onMouseMove={this.handleCanvasResizing}
            onMouseUp={this.handleCanvasResizeEnd}
          ></div>
        </div>
      </div>
    );
  }
}
