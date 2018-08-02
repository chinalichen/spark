import _ from 'lodash';
import { createShapes, findShapes } from '../modules/Shape';
import { STATUS_CODES } from 'http';

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
}

async function getShapes(ctx) {
  const docID = ctx.params.docID;
  const shapes = await findShapes(docID);
  ctx.status = 200;
  ctx.body = shapes;
}

export default function shapes(router) {
  router.get('/api/docs/:docID/shapes', getShapes);
  router.post('/api/docs/:docID/shapes', postShapes);
}
