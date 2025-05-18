const amqp = require("amqplib");

exports.publishToQueue = async (queue, data) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (err) {
    console.error("Failed to publish message:", err);
  }
};
