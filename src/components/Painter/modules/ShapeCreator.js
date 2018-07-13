import { Shapes } from "../Constants";
import Path from './Path';
import Point from "./Point";

export function createShape(json) {
  const [shapeType = Path] = [Path, Point].filter(t => t.type() === json.type);
  const shape = new shapeType();
  shape.fromJSON(json);
  return shape;
}
