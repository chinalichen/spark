export default class Point extends Graph {
  constructor(points) {
    super();
    if (!points) {
      return;
    }
    this.id = points.length;
    this.points = points;
    this.props = Point.solve(points);
    this.elem = <circle key={this.id} {...props} />
  }
  static generateID(points) {
    return `k${points[0] || 0}_${points[1] || 0}`;
  }
  static test(points) {
    if (!points) {
      return false;
    }
    if (points.length > 2) {
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
      cr: 1.5,
      fill: 'black',
    };
  }
}