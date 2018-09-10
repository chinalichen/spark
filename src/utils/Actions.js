import { createShapes, deleteShapes } from "../services/shape";
import { updateDoc } from "../services/doc";

export class Action {
  canExecute() { return true; }
  execute() { }
  executeServer() { }
  canUndo() { return true; }
  undo() { }
  undoServer() { }
}

function DisableSync(actionType) {
  return class Disabled extends actionType {
    canExecute() { return true }
    executeServer() { }
    canUndo() { return false }
    undoServer() { }
  }
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
export const CreateShapesSyncDisabledAction = DisableSync(CreateShapesAction);

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
export const UpdateSettingsSyncDisabledAction = DisableSync(UpdateSettingsAction);

export class DeleteShapesAction extends Action {
  constructor(shapesIDs) {
    super();
    this.ctx = { shapesIDs };
  }
  execute(doc) {
    const shapesIDs = this.ctx.shapesIDs.reduce((map, shapeID) => ({ ...map, [shapeID]: true }), {});
    const shapes = doc.shapes.filter(s => !shapesIDs[s.id]);
    const newDoc = { ...doc, shapes };
    return newDoc;
  }
  executeServer() { }
  undo() { }
  undoServer() { }
}
export const DeleteShapesSyncDisabledAction = DisableSync(DeleteShapesAction);
