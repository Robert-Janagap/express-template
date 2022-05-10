const mongoose = require("mongoose");
const config = require("config");
const mongoDBURL = config.get("mongoURI");
const debug = require("debug")("server:debug");
const chalk = require("chalk");
const errorHandling = require("../lib/errorsHandling");

const connectDB = async () => {
  if (mongoDBURL === "" || mongoDBURL === null || mongoDBURL === undefined)
    return console.log("database:", `No Connection`);
  try {
    const mongooseOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    let conn = await mongoose.connect(mongoDBURL, mongooseOption);
    console.log(chalk.blue("database:"), `${conn.connection.host}`);
  } catch (error) {
    mongoose.connection.close(() => {
      console.error(
        chalk.bold.red("Error"),
        errorHandling({
          errors: [error],
          message: "Mongoose connection disconnected",
          status: 500,
        })
      );
    });
  }
};

module.exports = connectDB;
