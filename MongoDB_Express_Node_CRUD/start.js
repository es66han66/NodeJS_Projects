import DB from "./DB/initialize.js";

import Server from "./server.js";

import Central from "./central.js";

class StartApp {
  async start() {
    const CRUDApp = new Central();
    CRUDApp.DBs = await new DB().getDBConnections(["users"]);
    new Server(CRUDApp).startServer();
  }
}

new StartApp().start();
