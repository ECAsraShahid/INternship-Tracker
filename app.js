const express = require("express");
const trackerRoutes = require("./backend/routes/trackerRoutes");
const connectDB = require("./backend/config/db");
const authRoutes = require("./backend/routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", trackerRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;