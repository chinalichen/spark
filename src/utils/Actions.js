import { createShapes, deleteShapes } from "../services/shape";
import { updateDoc } from "../services/doc";

export class Action {
  execute() { }
  executeServer() { }
  undo() { }
  undoServer() { }
}

export class CreateShapesAction extends Action {
  constructor(shapes) {
    super();
    this.ctx = { shapes };
  }
  execute(doc) {
    this.executeServer(doc.id, this.ctx.shapes);

    const shapes = doc.shapes.concat(this.ctx.shapes);
    return { ...doc, shapes };
  }
  executeServer(docID, shapes) {
    createShapes(docID, shapes);
  }
  undo(doc) {
    const shapesIDs = this.ctx.shapes.reduce((map, shape) => ({ ...map, [shape.id]: true }), {});
    this.undoServer(doc.id, this.ctx.shapes);

    const shapes = doc.shapes.filter(s => !shapesIDs[s.id]);
    return { ...doc, shapes };
  }
  undoServer(docID, shapes) {
    const ids = shapes.map(s => s.id);
    deleteShapes(docID, ids);
  }
}

export class UpdateSettingsAction extends Action {
  constructor(settings) {
    super();
    this.ctx = { settings, oldSettings: null };
  }
  execute(doc) {
    this.ctx.oldSettings = doc.settings;
    const newDoc = { ...doc, settings: this.ctx.settings };
    this.executeServer(newDoc);
    return newDoc;
  }
  executeServer(doc) {
    updateDoc(doc);
  }
  undo(doc) {
    const oldDoc = { ...doc, settings: this.ctx.oldSettings };
    this.undoServer(oldDoc);
    return oldDoc;
  }
  undoServer(doc) {
    updateDoc(doc);
  }
}
