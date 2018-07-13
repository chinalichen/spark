import { Shapes } from "../Constants";

export default class Context {
  constructor() {
    this.foreColor = 'black';
    this.backColor = 'white';
    this.size = 2;
    this.shape = Shapes.Path;
  }
}
