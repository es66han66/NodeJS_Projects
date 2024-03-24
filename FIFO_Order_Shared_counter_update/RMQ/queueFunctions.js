import {
  FANOUT_EXCHANGE
} from "../configs/development.js"
export default class QueueFunctions {
  constructor(RMQChannel) {
    this.RMQChannel = RMQChannel
  }

  async sendToFanoutExchange(message) {
    try {
      await this.RMQChannel.publish(FANOUT_EXCHANGE, '', Buffer.from(message))
      console.log("Increment broadcasted to connected incrementors")
    } catch (error) {
      console.log("Message publish failed to fan out exchange with error ", error)
    }
  }

  async getExclusiveQueue() {
    const queueName = 'consumer_queue_' + Math.random().toString(36).substring(7)
    await this.RMQChannel.assertQueue(queueName, { exclusive: true })
    // Bind the queue to the fanout exchange
    await this.RMQChannel.bindQueue(queueName, FANOUT_EXCHANGE, '')
    console.log(`Process queue binded to fan-out exchange`)
    return queueName
  }

  async consumeFromFanoutExchange(queueName){
    this.RMQChannel.consume(queueName, (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`)
        // Acknowledge the message
        this.RMQChannel.ack(msg)
      }
    })
  }
}
