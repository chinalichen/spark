import { CreateShapesSyncDisabledAction, DeleteShapesSyncDisabledAction } from '../../utils/Actions';

export const notificationHandler = (docID, actionManager, evt) => {
  const json = evt.data;
  if (!json) {
    return;
  }
  const notification = JSON.parse(json);
  if (notification.docID !== docID) {
    return;
  }
  switch (notification.type) {
    case 'createShapes': {
      const shapes = notification.shapes;
      if (shapes && shapes.length > 0) {
        actionManager.executeAction(new CreateShapesSyncDisabledAction(shapes))
      }
      break;
    }
    case 'deleteShapes': {
      const shapesIDs = notification.shapesIDs;
      if (shapesIDs && shapesIDs.length > 0) {
        actionManager.executeAction(new DeleteShapesSyncDisabledAction(shapesIDs))
      }
      break;
    }
    default:
      console.log('receive notification', notification.type);
  }
};
