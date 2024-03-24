import client from "amqplib"
import {
  RMQUrl,
  FANOUT_EXCHANGE
} from "../configs/development.js"

export default class RMQConnect {
  constructor() {}

  async Initialize() {
    const RMQClient = await client.connect(RMQUrl)
    console.log("RMQ successfully connected")
    const channel = await RMQClient.createConfirmChannel()
    console.log("Channel created")
    // Declare the fanout exchange
    await channel.assertExchange(FANOUT_EXCHANGE, 'fanout', { durable: false })
    return channel
  }
}