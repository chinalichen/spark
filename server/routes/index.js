import docs from './docController';
import shapes from './shapeController';
import notifications from './notification';

export function apis(router) {
  docs(router);
  shapes(router);
}

export function websockets(router) {
  return notifications(router);
}
