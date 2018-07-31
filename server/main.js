import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import routes from './routes';

const app = new Koa();
app.use(bodyParser());

const router = new Router();
routes(router);
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
console.log('listening on port 3000');
