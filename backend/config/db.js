const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/internship-tracker");

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error", err);
  }
};

module.exports = connectDB;