import React from 'react';
import Shpae from './Shape';
import { getIndex } from '../utils';
import { Shapes } from '../Constants';
import { generateID } from '../../../utils/id';

export default class Point extends Shpae {
  constructor(points, ctx) {
    super();
    if (!points) {
      return;
    }
    const { cx, cy } = Point.solve(points);
    const { foreColor, size } = ctx;
    this.id = generateID();
    this.meta = {
      type: Shapes.Point,
      id: this.id,
      index: getIndex(),
      cx, cy, r: size / 2,
      fill: foreColor,
      stroke: foreColor,
      strokeWidth: 0,
    };
    this.elem = Point.metaToElem(this.id, this.meta);
  }
  static metaToElem(id, meta) {
    return <circle
      key={id}
      cx={meta.cx}
      cy={meta.cy}
      r={meta.r}
      stroke={meta.stroke}
      strokeWidth={meta.strokeWidth}
      fill={meta.fill} />
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
    this.elem = Point.metaToElem(this.id, this.meta);
  }
}
