import _ from 'lodash';
import { addShapes } from '../modules/Shape';
import { STATUS_CODES } from 'http';

async function postShapes(ctx) {
  const shapes = ctx.request.body;
  if (!_.isArray(shapes)) {
    ctx.status = 400;
    ctx.body = STATUS_CODES[400];
    return;
  }

  await addShapes(ctx.params.docID, shapes);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

async function getShapes(ctx) {

}

export default function shapes(router) {
  router.post('/api/docs/:docID/shapes', postShapes);
}
