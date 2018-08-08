import * as Doc from '../modules/Doc';
import { STATUS_CODES } from 'http';

async function postDoc(ctx) {
  const doc = ctx.request.body;
  doc.userID = ctx.userID;
  await Doc.createDoc(doc);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

async function putDoc(ctx) {
  const doc = ctx.request.body;
  const docID = ctx.params.docID;
  doc.userID = ctx.userID;
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
  const userID = ctx.userID;
  const docs = await Doc.findDocs(userID);
  ctx.status = 200;
  ctx.body = docs;
}

async function deleteDoc(ctx) {
  const docID = ctx.params.docID;
  const doc = await Doc.deleteDoc(docID);
  ctx.status = 200;
  ctx.body = doc;
}

function trackDoc(ctx) {
  Doc.trackDoc(ctx.userID, ctx.params.docID);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

function untrackDoc(ctx) {
  Doc.untrackDoc(ctx.userID, ctx.params.docID);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

export default function docs(router) {
  return router.get('/api/docs', getDocs)
    .get('/api/docs/:docID', getDoc)
    .post('/api/docs', postDoc)
    .put('/api/docs/:docID', putDoc)
    .delete('/api/docs/:docID', deleteDoc)
    .post('/api/docs/:docID/tracking', trackDoc)
    .delete('/api/docs/:docID/tracking', untrackDoc);
}
