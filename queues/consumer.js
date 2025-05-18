const amqp = require("amqplib");
const mongoose = require("mongoose");
const Notif = require("../models/Notification");
const { handleNotif } = require("../services/notificationservice");
require("dotenv").config();

const MAX_RETRIES = 3;

const consumeFromQueue = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();

    const queue = "notifications";
    await channel.assertQueue(queue, { durable: true });

    console.log("Waiting for messages in queue:", queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const notifData = JSON.parse(msg.content.toString());

        const headers = msg.properties.headers || {};
        const retryCount = headers["x-retry-count"] || 0;

        try {
          const fullNotif = await Notif.findById(notifData._id);

          await handleNotif(fullNotif);

          fullNotif.status = "sent";
          await fullNotif.save();

          channel.ack(msg);
        } catch (error) {
          console.error(
            `Error processing notification (Attempt ${retryCount + 1}):`,
            error
          );

          if (retryCount < MAX_RETRIES) {
            channel.nack(msg, false, false);
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(notifData)), {
              persistent: true,
              headers: { "x-retry-count": retryCount + 1 },
            });

            console.log(`Message requeued for retry #${retryCount + 1}`);
          } else {
            channel.nack(msg, false, false);
            console.log(`Message dropped after ${MAX_RETRIES} retries`);
          }
        }
      }
    });
  } catch (err) {
    console.error("Failed to connect or consume:", err);
  }
};

consumeFromQueue();
