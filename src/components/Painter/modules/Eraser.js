import React from 'react';
import Shpae from './Shape';
import { getIndex } from '../utils';
import { Shapes } from '../Constants';
import { generateID } from '../../../utils/id';

export default class Eraser extends Shpae {
  constructor(points, ctx) {
    super();
    if (!points) {
      return;
    }
    const { backColor = 'white', size } = ctx;
    this.id = generateID();
    this.meta = {
      type: Shapes.Eraser,
      id: this.id,
      index: getIndex(),
      d: Eraser.solve(points),
      stroke: backColor,
      strokeWidth: size,
      strokeLinecap: 'round',
      fill: 'none',
    };
    this.elem = <path
      key={this.id}
      d={this.meta.d}
      stroke={this.meta.stroke}
      strokeWidth={this.meta.strokeWidth}
      strokeLinecap={this.meta.strokeLinecap}
      fill={this.meta.fill} />
  }
  static type() {
    return Shapes.Path;
  }
  static test(points) {
    if (!points) {
      return false;
    }
    if (points.length < 3) {
      return false;
    }
    return true;
  }
  static solve(points, k = 1) {
    const size = points.length;
    const last = size - 4;

    let path = `M${points[0]},${points[1]}`;

    for (let i = 0; i < size - 2; i += 2) {
      const x0 = i ? points[i - 2] : points[0];
      const y0 = i ? points[i - 1] : points[1];

      const x1 = points[i + 0];
      const y1 = points[i + 1];

      const x2 = points[i + 2];
      const y2 = points[i + 3];

      const x3 = i !== last ? points[i + 4] : x2;
      const y3 = i !== last ? points[i + 5] : y2;

      const cp1x = x1 + ((x2 - x0) / 6) * k;
      const cp1y = y1 + ((y2 - y0) / 6) * k;

      const cp2x = x2 - ((x3 - x1) / 6) * k;
      const cp2y = y2 - ((y3 - y1) / 6) * k;

      path += ` C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
    }

    return path;
  }
  toJSON() {
    return {
      ...this.meta
    };
  }
  fromJSON(json) {
    this.meta = json;
    this.id = json.id;
    this.elem = <path
      key={this.id}
      d={this.meta.d}
      stroke={this.meta.stroke}
      strokeWidth={this.meta.strokeWidth}
      strokeLinecap={this.meta.strokeLinecap}
      fill={this.meta.fill} />
  }
}
