import React, { Component } from 'react';
import './Painter.css';

// import TweenLite, { Linear, TimelineMax } from 'gsap/TweenMax';
// import Draggable from 'gsap/Draggable';

// TweenLite.defaultEase = Linear.easeNone;

// const perf = window.performance;
// const now = perf ? perf.now.bind(perf) : Date.now;

// const pencilPoint = document.querySelector("#pencil-point");
// const pencilPath = document.querySelector("#pencil-path");
// const smoothPath = document.querySelector("#smooth-path");

// let points = [];
// let strokes = [];
// let prev = null;
// let start = 0;

// const tl = new TimelineMax();

// let pencil = new Draggable(pencilPoint, {
// 	bounds: "#svg-drawing",
// 	trigger: "#svg-drawing",
// 	cursor: "crosshair",
// 	onDrag,
// 	onDragEnd,
// 	onPress
// });

// function onPress() {

// 	tl.clear();

// 	start = now();

// 	pencilPath.setAttribute("points", "");
// 	smoothPath.setAttribute("d", "");

// 	let x = this.pointerX;
// 	let y = this.pointerY;

// 	let stroke = {
// 		elapsed: 0,
// 		time: start,
// 		dist: 0,
// 		x: x,
// 		y: y
// 	};

// 	points = [x, y];
// 	strokes = [stroke];
// 	prev = stroke;

// 	TweenLite.set(pencilPoint, { x, y });
// 	this.update();
// }

// function onDrag() {

// 	let time = now();
// 	let elapsed = time - prev.time;

// 	let dist = getDistance(prev, this);

// 	let x = this.endX;
// 	let y = this.endY;

// 	let stroke = {
// 		elapsed: elapsed,
// 		time: time,
// 		dist: prev.dist + dist,
// 		x: x,
// 		y: y
// 	};

// 	prev = stroke;
// 	strokes.push(stroke);
// 	points.push(x, y);
// 	pencilPath.setAttribute("points", points);
// }

// function onDragEnd() {

// 	let totalTime = (now() - start) / 1000;
// 	let totalDist = strokes[strokes.length - 1].dist;

// 	smoothPath.setAttribute("d", solve(points));
// 	pencilPath.setAttribute("points", "");

// 	strokes.reduce((tl, stroke) => {

// 		let time = stroke.elapsed / 1000;
// 		let draw = (stroke.dist / totalDist * 100) + "%";

// 		return tl.to(smoothPath, time, { drawSVG: draw });
// 	}, tl);
// }

// function getDistance(p1, p2) {
// 	let dx = p2.x - p1.x;
// 	let dy = p2.y - p1.y;
// 	return Math.sqrt(dx * dx + dy * dy);
// }

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

export default class Painter extends Component {
  constructor(props) {
    super(props);
    this.handleDrawStart = this.handleDrawStart.bind(this);
    this.handleDrawMove = this.handleDrawMove.bind(this);
    this.handleDrawEnd = this.handleDrawEnd.bind(this);
    this.state = { paths: [] };
    this.points = null;
    this.count = 0;
  }
  updateCurrentPath() {
    if (this.points) {
      this.setState({ currentPath: solve(this.points) });
    }
  }
  handleDrawStart(evt) {
    this.points = [evt.clientX, evt.clientY];
    this.updateCurrentPath();
  }
  handleDrawMove(evt) {
    if (!this.points) {
      return;
    }
    this.points = this.points.concat([evt.clientX, evt.clientY]);
    this.updateCurrentPath();
  }
  handleDrawEnd(evt) {
    if (!this.points) {
      return;
    }
    this.points = this.points.concat([evt.clientX, evt.clientY]);
    const d = solve(this.points, 1);
    this.points = null;
    const paths = this.state.paths.concat({ id: (this.count += 1), d });
    this.setState({ paths, currentPath: null });
  }
  render() {
    return (
      <div
        className="painter-container"
        role="presentation"
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
          {this.state.currentPath && (
            <path className="paths" d={this.state.currentPath} />
          )}
        </svg>
      </div>
    );
  }
}
