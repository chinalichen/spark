import { generateID } from "../../src/utils/id";

export default function notifications(router) {
  return router.all('/api/ws', function (ctx) {
    const client = {
      conn: ctx.websocket,
      id: generateID(),
    };

    // clients[client.id] = client;

    ctx.websocket.on('message', function (message) {
      ctx.websocket.send('HELLOOO');
      console.log('onmessage', message);
    });
    let count;
    const handler = setInterval(function () {
      ctx.websocket.send('beacon', count++);
    }, 3000);
    ctx.websocket.on('close', function () {
      clearInterval(handler);
    });
  });
}
