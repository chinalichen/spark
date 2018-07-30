import mogoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;

const Shape = new Schema({
  id: String,
  meta: String,
  fileID: String,
}, { id: false });

const ShapeModel = mogoose.model('shapes', Shape);

export function addShapes(fileID, shapes) {
  shapes.forEach(s => {
    const shape = new ShapeModel();
    shape.id = s.id;
    shape.elem = JSON.stringify(s.elem);
    shape.save((err) => {
      if (err != null) {
        console.log('save shape error: ', err, s);
      }
    });
  });
}


export default ShapeModel;
