const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const config = require("config");
const debug = require("debug")("server:debug");
const connectDB = require("./database/connect");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const chalk = require("./lib/logColor.lib");

const app = express();

// connect to database
connectDB();

// express default bodyparser
app.use(express.json({ extended: false }));

// prevent cors issue
app.use(cors());

/** secure http */
app.use(helmet());

/** reduce/zip data size served to users */
app.use(compression());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// request dev logger
app.use(morgan("dev"));

// log all request to access.log
app.use(morgan("combined", { stream: accessLogStream }));

// routes
require("./routes/v1/index.route")(app);

const PORT = process.env.PORT || config.get("PORT");

const listen = app.listen(PORT, () => {
  console.log(chalk.blue("url:"), `    http://localhost:${PORT}`);
  console.log(chalk.blue("doc:"), `    http://localhost:${PORT}/api-docs`);
  console.log(chalk.blue("server:"), ` ${config.get("server")}`);
  app.emit("serverStarted");
});

module.exports = app;
module.exports.port = listen.address().port;
