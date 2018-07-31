import _ from 'lodash';
import { addShapes } from '../modules/Shape';
import { STATUS_CODES } from 'http';

function postShapes(ctx) {
  const shapes = ctx.request.body;
  if (!_.isArray(shapes)) {
    ctx.status = 400;
    ctx.body = STATUS_CODES[400];
    return;
  }
  addShapes('', shapes);
  ctx.status = 200;
}

export default function shapes(router) {
  router.post('/api/shapes', postShapes);
}
