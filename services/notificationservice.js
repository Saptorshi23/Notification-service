const nodemailer = require("nodemailer");

exports.handleNotif = async (notification) => {
  try {
    switch (notification.type) {
      case "email":
        await sendEmail(notification.message);
        break;
      case "sms":
        console.log("[SMS] Sent:", notification.message);
        break;
      case "in-app":
        console.log("[IN-APP] Notification:", notification.message);
        break;
      default:
        console.log("Unknown notification type:", notification.type);
        break;
    }
  } catch (error) {
    console.error("Error handling notification:", error.message);
  }
};

const sendEmail = async (message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"Notification Service" <${process.env.EMAIL_USER}>`,
    to: "saptorshibanerjee32@gmail.com",
    subject: "New Notification",
    text: message,
  };
  await transporter.sendMail(mailOptions);
};
