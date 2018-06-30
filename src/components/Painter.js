import React, { Component } from 'react';
import './Painter.css';

function solve(data, k = 1) {
  const size = data.length;
  const last = size - 4;

  let path = `M${data[0]},${data[1]}`;

  for (let i = 0; i < size - 2; i += 2) {
    const x0 = i ? data[i - 2] : data[0];
    const y0 = i ? data[i - 1] : data[1];

    const x1 = data[i + 0];
    const y1 = data[i + 1];

    const x2 = data[i + 2];
    const y2 = data[i + 3];

    const x3 = i !== last ? data[i + 4] : x2;
    const y3 = i !== last ? data[i + 5] : y2;

    const cp1x = x1 + ((x2 - x0) / 6) * k;
    const cp1y = y1 + ((y2 - y0) / 6) * k;

    const cp2x = x2 - ((x3 - x1) / 6) * k;
    const cp2y = y2 - ((y3 - y1) / 6) * k;

    path += ` C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
  }

  return path;
}

function hasXY(evt) {
  if (evt.clientX == null) {
    return false;
  }
  if (evt.clientY == null) {
    return false;
  }
  return true;
}

export default class Painter extends Component {
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
    this.pointsList[idx] = (this.pointsList[idx] || []).concat([x, y]);
  }
  updateCurrentPath() {
    if (this.hasPoints()) {
      this.setState({ currentPaths: this.pointsList.map(ps => solve(ps)) });
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
    const paths = this.state.paths.concat({ id: (this.count += 1), d });
    this.setState({ paths, currentPaths: [] });
  }
  handleTouchStart(evt) {
    Array.from(evt.touches).forEach((te, idx) => {
      if (hasXY(te)) {
        this.updatePoints(idx, te.clientX, te.clientY);
      }
    });
  }
  handleTouchMove(evt) {
    if (!this.hasPoints()) {
      return;
    }
    Array.from(evt.touches).forEach((te, idx) => {
      if (hasXY(te)) {
        this.updatePoints(idx, te.clientX, te.clientY);
      }
    });
    this.updateCurrentPath();
  }
  handleTouchEnd(evt) {
    if (!this.hasPoints()) {
      return;
    }
    Array.from(evt.touches).forEach((te, idx) => {
      if (hasXY(te)) {
        this.updatePoints(idx, te.clientX, te.clientY);
      }
    });
    const ds = this.pointsList
      .filter(ps => ps && ps.length > 0)
      .map(ps => solve(ps, 1))
      .map(d => ({ id: (this.count += 1), d }));
    this.pointsList = null;
    const paths = this.state.paths.concat(ds);
    this.setState({ paths, currentPaths: [] });
  }
  render() {
    return (
      <div
        className="painter-container"
        role="presentation"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onMouseDown={this.handleDrawStart}
        onMouseMove={this.handleDrawMove}
        onMouseUp={this.handleDrawEnd}
      >
        <svg className="svgDrawing">
          {this.state.paths.map(p => (
            <path className="paths" key={p.id} d={p.d} />
          ))}
        </svg>
        <svg className="svgDrawing">
          {this.state.currentPaths.map((d, i) => <path className="paths" key={i} d={d} />)}
        </svg>
      </div>
    );
  }
}
