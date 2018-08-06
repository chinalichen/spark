export default function notifications(router) {
  return router.all('/api/ws', function (ctx) {
    ctx.websocket.on('message', function (message) {
      ctx.websocket.send('HELLOOO');
      console.log('onmessage', message);
    });
  });
}