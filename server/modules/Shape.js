import mogoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;

const Shape = new Schema({
  id: String,
  meta: String,
  docID: String,
}, { id: false });

const ShapeModel = mogoose.model('shapes', Shape);

export async function createShapes(docID, shapes) {
  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    const shape = new ShapeModel();
    shape.id = s.id;
    shape.elem = JSON.stringify(s.elem);
    shape.docID = docID;
    await shape.save((err) => {
      if (err != null) {
        console.log('save shape error: ', err, s);
      }
    });
  }
}

export async function findShapes(docID) {
  const shapes = await ShapeModel.find({ docID });
  return shapes;
}

export default ShapeModel;
