export default class ActionManager {
  constructor(initState) {
    this.actions = [];
    this.redoActions = [];

    this.state = initState;

    this.onChange = null;
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
    this.actions.push(action);
    this.state = action.execute(this.state);
    this.emitOnChange();
  }
  executeAction(action) {
    this.state = action.execute(this.state);

    this.actions.push(action);
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
