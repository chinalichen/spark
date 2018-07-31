import mogoose, { Schema } from 'mongoose';

const Doc = new Schema({
  id: String,
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
  newDoc.createTime = new Date();
  newDoc.createBy = userID;
  newDoc.modifyTime = new Date();
  newDoc.modifyBy = userID;
  await newDoc.save((err) => {
    if (err != null) {
      console.log('create doc error: ', err, newDoc);
    }
  });
}

export default DocModel;
