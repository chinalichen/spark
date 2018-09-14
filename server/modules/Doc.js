import mogoose, { Schema } from 'mongoose';

const docsTrackings = {};

const CanvasSize = new Schema({
  height: Number,
  width: Number,
});

const DocSettings = new Schema({
  backColor: String,
  foreColor: String,
  size: Number,
  shape: String,
  canvasSize: CanvasSize,
});

const Doc = new Schema({
  id: String,
  name: String,
  settings: DocSettings,
  createTime: Date,
  createBy: String,
  modifyTime: Date,
  modifyBy: String,
}, { id: false });

const DocModel = mogoose.model('docs', Doc);

export async function createDoc(doc) {
  const newDoc = new DocModel();
  newDoc.id = doc.id;
  newDoc.name = doc.name;
  newDoc.createTime = new Date();
  newDoc.createBy = doc.userID;
  newDoc.modifyTime = new Date();
  newDoc.modifyBy = doc.userID;
  const createdDoc = await newDoc.save();
  return createdDoc;
}

export async function updateDocThumbnail(docID, userID) {
  const udpatedDoc = await DocModel.update({ id: docID }, { modifyTime: new Date(), modifyBy: userID });
  return udpatedDoc;
}

export async function updateDoc(doc) {
  const udpatedDoc = await DocModel.update({ id: doc.id }, doc);
  return udpatedDoc;
}

export async function findDoc(docID) {
  const doc = await DocModel.findOne({ id: docID });
  return doc;
}

export async function findDocs(userID) {
  const docs = await DocModel.find({ createBy: userID });
  return docs;
}

export async function deleteDoc(docID) {
  const doc = await DocModel.deleteOne({ id: docID });
  return doc;
}

export async function trackDoc(userID, docID) {
  const trackings = docsTrackings[docID] || {};
  trackings[userID] = true;
  return true;
}

export async function untrackDoc(userID, docID) {
  const trackings = docsTrackings[docID];
  if (!trackings) {
    return true;
  }
  delete trackings[userID];
  return true;
}
