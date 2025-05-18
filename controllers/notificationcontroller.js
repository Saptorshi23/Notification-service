const Notif = require("../models/Notification");
const { publishToQueue } = require("../queues/producer");

exports.sendnotif = async (req, res) => {
  const { userId, type, message } = req.body;

  try {
    const notif = await Notif.create({ userId, type, message });
    await publishToQueue("notifications", notif);
    res.status(201).json({ message: "Notification queued", notif });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.gusernotifs = async (req, res) => {
  try {
    const notifs = await Notif.find({ userId: req.params.id });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
