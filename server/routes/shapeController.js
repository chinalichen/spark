import isArray from 'lodash/isArray';
import { createShapes, findShapes, deleteShapes } from '../modules/Shape';
import { STATUS_CODES } from 'http';
import { clientManager } from '../modules/Client';

async function postShapesFunc(ctx) {
  const shapes = ctx.request.body;
  if (!isArray(shapes)) {
    ctx.status = 400;
    ctx.body = STATUS_CODES[400];
    return;
  }

  await createShapes(ctx.params.docID, shapes);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];

  //setTimeout(() => {
  clientManager.send({ type: 'createShapes', docID: ctx.params.docID, shapes: shapes }, { [ctx.userID]: true });
  //});
}

async function deleteShapesFunc(ctx) {
  const shapesIDs = ctx.request.body;
  if (!isArray(shapesIDs)) {
    ctx.status = 400;
    ctx.body = STATUS_CODES[400];
    return;
  }
  await deleteShapes(ctx.params.docID, shapesIDs);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];

  clientManager.send({ type: 'deleteShapes', docID: ctx.params.docID, shapesIDs: shapesIDs }, { [ctx.userID]: true });
}

async function getShapesFunc(ctx) {
  const docID = ctx.params.docID;
  const shapes = await findShapes(docID);
  ctx.status = 200;
  ctx.body = shapes;
}

export default function shapes(router) {
  return router
    .get('/api/docs/:docID/shapes', getShapesFunc)
    .post('/api/docs/:docID/shapes', postShapesFunc)
    .post('/api/docs/:docID/shapes/deletes', deleteShapesFunc);
}
