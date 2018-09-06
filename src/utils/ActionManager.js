export default class ActionManager {
  constructor(initState) {
    this.actions = [];
    this.redoActions = [];

    this.state = initState;

    this.onChange = null;
  }
  undo() {

  }
  redo() {

  }
  executeAction(action) {
    this.state = action.execute(this.state);

    this.actions.push(action);
    if (this.redoActions.length !== 0) {
      this.redoActions = [];
    }

    if (this.onChange) {
      this.onChange(this.state);
    }
  }
}
