import docs from './docController';
import shapes from './shapeController';

export default function apis(router) {
  docs(router);
  shapes(router);
}
