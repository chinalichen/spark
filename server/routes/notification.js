import { clientManager, Client } from "../modules/Client";

export default function notifications(router) {
  return router.all('/api/ws', function (ctx) {
    const userID = ctx.cookies.get('userID')
    ctx.websocket.on('close', function () {
      clientManager.deleteClient(userID);
    });
    clientManager.addClient(userID, new Client(userID, ctx.websocket));
  });
}
