import mogoose, { Schema } from 'mongoose';

const DocSettings = new Schema({
  color: String,
  size: Number,
  shape: String,
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
  const userID = 'user id';
  const newDoc = new DocModel();
  newDoc.id = doc.id;
  newDoc.name = doc.name;
  newDoc.createTime = new Date();
  newDoc.createBy = userID;
  newDoc.modifyTime = new Date();
  newDoc.modifyBy = userID;
  const createdDoc = await newDoc.save();
  return createdDoc;
}

export async function updateDoc(doc) {
  const udpatedDoc = await DocModel.update({ id: doc.id }, doc);
  return udpatedDoc;
}

export async function findDoc(docID) {
  const doc = await DocModel.findOne({ id: docID });
  return doc;
}

export async function findDocs() {
  const docs = await DocModel.find();
  return docs;
}

export async function deleteDoc(docID) {
  const doc = await DocModel.deleteOne({ id: docID });
  return doc;
}
