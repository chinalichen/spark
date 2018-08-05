import * as Doc from '../modules/Doc';
import { STATUS_CODES } from 'http';

async function postDoc(ctx) {
  const doc = ctx.request.body;
  await Doc.createDoc(doc);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

async function putDoc(ctx) {
  const doc = ctx.request.body;
  const docID = ctx.params.docID;
  const updatedDoc = await Doc.updateDoc({ ...doc, docID });
  ctx.status = 200;
  ctx.body = updatedDoc;
}

async function getDoc(ctx) {
  const docID = ctx.params.docID;
  const doc = await Doc.findDoc(docID);
  ctx.status = 200;
  ctx.body = doc;
}

async function getDocs(ctx) {
  const docs = await Doc.findDocs();
  ctx.status = 200;
  ctx.body = docs;
}

async function deleteDoc(ctx) {
  const docID = ctx.params.docID;
  const doc = await Doc.deleteDoc(docID);
  ctx.status = 200;
  ctx.body = doc;
}

export default function docs(router) {
  router.get('/api/docs', getDocs);
  router.get('/api/docs/:docID', getDoc);
  router.post('/api/docs', postDoc);
  router.put('/api/docs/:docID', putDoc);
  router.delete('/api/docs/:docID', deleteDoc);
}
