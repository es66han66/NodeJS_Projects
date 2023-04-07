import Server from "./server.js";

class StartApp {
  async start() {
    new Server().startServer();
  }
}

new StartApp().start();
