import { generateID } from "../../src/utils/id";

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
    this.clients[userID] = client;
  }
  deleteClient(userID) {
    delete this.clients[userID];
  }
  getClient(userID) {
    return this.clients[userID];
  }
  send(notification, excludes = {}) {
    for (let userID in this.clients) {
      if (excludes[userID]) {
        continue;
      }
      const client = this.clients[userID];
      client.conn.send(JSON.stringify(notification));
    }
  }
}

export const clientManager = new ClientManager();
