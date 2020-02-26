const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");
const debug = require("debug")("server:debug");

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    debug("Database connected...");
    console.log("Database connected...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
