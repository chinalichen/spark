import mogoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;

const Shape = new Schema({
  id: ObjectId,
  meta: String,
  fileID: String,
});

const ShapeModel = mogoose.model('shapes', Shape);

export function addShapes(fileID, shapes) {
  shapes.forEach(s => {
    const shape = new ShapeModel();
    shape.id = s.id;
    shape.elem = JSON.stringify(s.elem);
    shape.save((err) => {
      console.log('save shape error: ', err, s);
    });
  });
}


export default ShapeModel;
