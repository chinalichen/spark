import mongoose from 'mongoose';
import { addShapes } from '../modules/Shape';

mongoose.connect('mongodb://localhost:27017/spark');

export default function shapes(router) {
  router.post('/api/shape', ctx => {
    addShapes('', [{ id: 's1', elem: 'hahah', fileID: '1' }]);
    ctx.status = 200;
  });
}
