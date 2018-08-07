export class Client {
  constructor(userID, conn) {
    this.userID = userID;
    this.clientID = generateID();
    this.conn = conn;
  }
}

class ClientManager {
  constructor() {
    this.clients = {};
  }
  addClient(userID, client) {
    this.clients[client.userID] = client;
  }
  deleteClient(userID) {
    delete this.clients[userID];
  }
  getClient(userID) {
    return this.clients[userID];
  }
  send() {
    ctx.websocket.on('message', function (message) {
      ctx.websocket.send('HELLOOO');
      console.log('onmessage', message);
    });
    ctx.websocket.send('beacon', count++);
  }
}

export const clientManager = new ClientManager();
