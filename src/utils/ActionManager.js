export default class ActionManager {
  constructor(initState) {
    this.actions = [];
    this.redoActions = [];

    this.state = initState;

    this.onChange = null;
  }
  hasActions() {
    return this.actions.length > 0;
  }
  undo() {
    if (this.actions.length === 0) {
      return;
    }
    const action = this.actions.pop();
    this.redoActions.push(action);
    this.state = action.undo(this.state);
    this.emitOnChange();
  }
  redo() {
    if (this.redoActions.length === 0) {
      return;
    }
    const action = this.redoActions.pop();
    if (action.canExecute()) {
      this.actions.push(action);
      this.state = action.execute(this.state);
    }
    this.emitOnChange();
  }
  executeAction(action) {
    this.state = action.execute(this.state);

    if (action.canUndo()) {
      this.actions.push(action);
    }
    if (this.redoActions.length !== 0) {
      this.redoActions = [];
    }
    this.emitOnChange();
  }
  emitOnChange() {
    if (this.onChange) {
      this.onChange(this.state);
    }
  }
}
