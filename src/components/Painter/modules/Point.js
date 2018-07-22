import React from 'react';
import Shpae from './Shape';
import { getID } from '../utils';
import { Shapes } from '../Constants';

export default class Point extends Shpae {
  constructor(points, ctx) {
    super();
    if (!points) {
      return;
    }
    const { cx, cy } = Point.solve(points);
    const { foreColor, backColor, size, shape } = ctx;
    this.id = getID();
    this.meta = {
      type: Shapes.Point,
      id: this.id,
      cx, cy, r: size,
      fill: foreColor,
      stroke: foreColor,
      strokeWidth: 0,
    };
    this.elem = <circle
      key={this.id}
      cx={this.meta.cx}
      cy={this.meta.cy}
      r={this.meta.r}
      stroke={this.meta.stroke}
      strokeWidth={this.meta.strokeWidth}
      fill={this.meta.fill} />
  }
  static type() {
    return Shapes.Point;
  }
  static test(points) {
    if (!points) {
      return false;
    }
    if (points.length > 6) {
      return false;
    }
    return true;
  }
  static solve(points, k = 1) {
    const x = points[0] || 0;
    const y = points[1] || 0;
    return {
      cx: x,
      cy: y,
    };
  }
  toJSON() {
    return {
      ...this.meta
    };
  }
  fromJSON(json) {
    this.meta = json;
    this.id = json.id;
    this.elem = <circle
      key={this.id}
      cx={this.meta.cx}
      cy={this.meta.cy}
      r={this.meta.r}
      stroke={this.meta.stroke}
      strokeWidth={this.meta.strokeWidth}
      fill={this.meta.fill} />
  }
}
