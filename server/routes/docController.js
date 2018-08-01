import { createDoc, findDoc, findDocs } from '../modules/Doc';
import { STATUS_CODES } from 'http';

async function postDoc(ctx) {
  const doc = ctx.request.body;
  await createDoc(doc);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

async function getDoc(ctx) {
  const docID = ctx.params.docID;
  const doc = await findDoc(docID);
  ctx.status = 200;
  ctx.body = doc;
}

async function getDocs(ctx) {
  const docs = await findDocs();
  ctx.status = 200;
  ctx.body = docs;
}

export default function docs(router) {
  router.get('/api/docs', getDocs);
  router.get('/api/docs/:docID', getDoc);
  router.post('/api/docs', postDoc);
}
