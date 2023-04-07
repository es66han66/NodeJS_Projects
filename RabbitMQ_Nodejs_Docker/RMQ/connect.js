import client from "amqplib";
import config from "../configs/development.js";

export default class RMQConnect {
  constructor() {}

  async Initialize() {
    const RMQClient = await client.connect(config.RMQUrl);
    const channel = await RMQClient.createChannel()
    console.log("RMQ successfully connected");
    return channel;
  }
}
