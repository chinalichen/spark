import mogoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;

const Shape = new Schema({
  id: String,
  settings: String,
  docID: String,
}, { id: false });

const ShapeModel = mogoose.model('shapes', Shape);

export async function createShapes(docID, shapes) {
  for (let i = 0; i < shapes.length; i++) {
    const { id, ...settings } = shapes[i];
    const shape = new ShapeModel();
    shape.id = id;
    shape.settings = JSON.stringify(settings);
    shape.docID = docID;
    await shape.save((err) => {
      if (err != null) {
        console.log('save shape error: ', err, id, settings);
      }
    });
  }
}

export async function findShapes(docID) {
  const shapes = await ShapeModel.find({ docID });
  return shapes.map(s => ({ id: s.id, docID: s.docID, ...JSON.parse(s.settings) }));
}
