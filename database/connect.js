const mongoose = require("mongoose");
const config = require("config");
const mongoDBURL = config.get("mongoURI");
const chalk = require("chalk");
const { CommonError } = require("../lib/exception");

const connectDB = async () => {
  if (mongoDBURL === "" || mongoDBURL === null || mongoDBURL === undefined)
    return console.log("database:", `No Connection`);
  try {
    const mongooseOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    let conn = await mongoose.connect(mongoDBURL, mongooseOption);
    console.log(chalk.blue("database:"), `${conn.connection.host}`);
  } catch (error) {
    mongoose.connection.close(() => {
      throw new CommonError({
        message: "Database Disconnected",
        code: 500,
      });
    });
  }
};

module.exports = connectDB;
