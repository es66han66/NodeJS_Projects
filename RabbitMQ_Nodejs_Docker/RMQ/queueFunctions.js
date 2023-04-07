export default class QueueFunctions {
  constructor(RMQChannel) {
    this.RMQChannel = RMQChannel;
  }

  async sendToQueue(queue, message) {
    await this.RMQChannel.assertQueue(queue);
    await this.RMQChannel.sendToQueue(queue, Buffer.from(message));
  }

  async consumeMessages(queue) {
    const consumer = (channel) => (msg) => {
      if (msg) {
        // Display the received message
        console.log(msg.content.toString());
        // Acknowledge the message
        channel.ack(msg);
      }
    };
    await this.RMQChannel.consume(queue, consumer(this.RMQChannel));
  }
}
