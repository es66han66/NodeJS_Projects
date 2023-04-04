import DB from "./DB/initialize.js";
import { getRedisClient } from "./Caching/cache.js";

import Server from "./server.js";

import Central from "./central.js";

class StartApp {
  async start() {
    const CRUDApp = new Central();
    CRUDApp.DBs = await new DB().getDBConnections(["users"]);
    CRUDApp.Cache = await getRedisClient()
    console.log("Redis connected and at 13")
    new Server(CRUDApp).startServer();
  }
}

new StartApp().start();
