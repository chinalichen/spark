import _ from 'lodash';
import { createShapes, findShapes } from '../modules/Shape';
import { STATUS_CODES } from 'http';
import { clientManager } from '../modules/Client';

async function postShapes(ctx) {
  const shapes = ctx.request.body;
  if (!_.isArray(shapes)) {
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

async function getShapes(ctx) {
  const docID = ctx.params.docID;
  const shapes = await findShapes(docID);
  ctx.status = 200;
  ctx.body = shapes;
}

export default function shapes(router) {
  return router
    .get('/api/docs/:docID/shapes', getShapes)
    .post('/api/docs/:docID/shapes', postShapes);
}
