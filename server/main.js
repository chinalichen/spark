import Router from 'koa-router';
import Koa from 'koa';
import routes from './routes';

const app = new Koa();
const router = new Router();

routes(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
console.log('listening on port 3000');
