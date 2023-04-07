import RMQConnect from "./RMQ/connect.js";
import QueueFunctions from "./RMQ/queueFunctions.js";
import Central from "./central.js";

class StartApp {
  async start() {
    const CentralApp = new Central();
    CentralApp.RMQ = await new RMQConnect().Initialize()
    const queueFunctions = new QueueFunctions(CentralApp.RMQ)
    await queueFunctions.sendToQueue("eshan","hello")
    await queueFunctions.consumeMessages("eshan")
    await queueFunctions.sendToQueue("eshan","hello1")

  }
}

new StartApp().start();
