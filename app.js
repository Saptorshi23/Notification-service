require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(express.json());

app.use("/notifications", notificationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
