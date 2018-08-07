import { generateID } from "../../src/utils/id";
import { clientManager, Client } from "../modules/Client";

export default function notifications(router) {
  return router.all('/api/ws', function (ctx) {
    ctx.websocket.on('close', function () {
      clientManager.deleteClient(ctx.userID);
    });
    clientManager.addClient(new Client(ctx.userID, ctx.websocket));
  });
}
