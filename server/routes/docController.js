import * as Doc from '../modules/Doc';
import koaBody from 'koa-body';
import { STATUS_CODES } from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';

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

async function updateDocThumbnail(ctx) {
  const userID = ctx.userID;
  const docID = ctx.params.docID;
  const fullName = process.env['NODE_ENV'] === 'development' ? path.join(process.cwd(), 'public', 'images', `${docID}.png`) : path.join(process.cwd(), 'build', 'images', `${docID}.png`);

  const [thumbnailName] = Object.keys(ctx.request.files);
  const file = ctx.request.files[thumbnailName];
  const reader = fs.createReadStream(file.path);
  console.log(`[${new Date().toJSON()}]`, '[updateDocThumbnail][thumbnail directory path]:', fullName);
  const stream = fs.createWriteStream(fullName);
  reader.pipe(stream);
  await Doc.updateDocThumbnail(docID, userID);
  ctx.status = 200;
  ctx.body = { from: file.name, to: stream.path };
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
    .post('/api/docs/:docID/thumbnail', koaBody({ multipart: true }), updateDocThumbnail)
    .post('/api/docs/:docID/tracking', trackDoc)
    .delete('/api/docs/:docID/tracking', untrackDoc);
}
