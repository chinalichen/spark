import { createDoc } from '../modules/Doc';
import { STATUS_CODES } from 'http';

async function postDoc(ctx) {
  const doc = ctx.request.body;
  await createDoc(doc);
  ctx.status = 200;
  ctx.body = STATUS_CODES[200];
}

export default function docs(router) {
  router.post('/api/docs/', postDoc);
}
