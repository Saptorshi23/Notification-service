const express = require("express");
const router = express.Router();
const {
  sendnotif,
  gusernotifs,
} = require("../controllers/notificationController");
router.post("/", sendnotif);
router.get("/user/:id", gusernotifs);
module.exports = router;
