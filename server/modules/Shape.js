import mogoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;

const Shape = new Schema({
  id: String,
  meta: String,
  fileID: String,
}, { id: false });

const ShapeModel = mogoose.model('shapes', Shape);

export async function addShapes(fileID, shapes) {
  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    const shape = new ShapeModel();
    shape.id = s.id;
    shape.elem = JSON.stringify(s.elem);
    shape.fileID = fileID;
    await shape.save((err) => {
      if (err != null) {
        console.log('save shape error: ', err, s);
      }
    });
  }
}


export default ShapeModel;
