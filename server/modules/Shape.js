import mogoose, { Schema } from 'mongoose';

const Shape = new Schema({
  id: String,
  index: Number,
  docID: String,
  settings: String,
}, { id: false });

const ShapeModel = mogoose.model('shapes', Shape);

export async function createShapes(docID, shapes) {
  for (let i = 0; i < shapes.length; i++) {
    const { id, index, ...settings } = shapes[i];

    const shape = new ShapeModel();
    shape.id = id;
    shape.index = index;
    shape.docID = docID;
    shape.settings = JSON.stringify(settings);

    await shape.save((err) => {
      if (err != null) {
        console.log('save shape error: ', err, id, settings);
      }
    });
  }
}

export async function deleteShapes(docID, shapesIDs) {
  return new Promise((resolve, reject) => {
    ShapeModel.remove({ docID, id: { $in: shapesIDs } }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function findShapes(docID) {
  const shapes = await ShapeModel.find({ docID });
  return shapes.map(s => ({ id: s.id, docID: s.docID, ...JSON.parse(s.settings) }));
}
