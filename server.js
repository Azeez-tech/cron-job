// ==== File: server/index.js ====
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cron = require("node-cron");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const DB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Connect to mongodb established. ",
      (await conn).connection.host
    );
  } catch (error) {
    console.log("Connection to mongodb failed");
    process.exit(1);
  }
};

// Import routes and scheduler
const userRoutes = require("./routes/userRoutes");
const birthdayScheduler = require("./scheduler/birthdayJob");

app.use("/api/users", userRoutes);

// Start birthday email scheduler
birthdayScheduler();

// Start server
DB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
