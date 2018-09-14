import mongoose from 'mongoose';
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import websockify from 'koa-websocket';
import { apis, websockets } from './routes';
import { auth } from './middlewares/auth';

mongoose.connect('mongodb://localhost:27017/spark');

const app = websockify(new Koa());
app.use(koaBody());
app.use(auth());

const router = new Router();
apis(router);
app
  .use(router.routes())
  .use(router.allowedMethods());

app.ws.use(websockets(router).routes());

app.listen(3001);
console.log('listening on port 3001');
