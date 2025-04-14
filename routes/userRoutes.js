const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { username, email, dateOfBirth } = req.body;
    const user = new User({ username, email, dateOfBirth });
    await user.save();
    res.redirect("/success.html");
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

module.exports = router;
