const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const config = require("config");
const debug = require("debug")("server:debug");
const connectDB = require("./database/connect");
const cors = require("cors");

const app = express();

// connect to database
connectDB();

// express default bodyparser
app.use(express.json({ extended: false }));

// prevent cors issue
app.use(cors());

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
app.use("/v1/audit", require("./routes/v1/audit"));

const PORT = process.env.PORT || config.get("PORT");

const listen = app.listen(PORT, () => {
  debug(`Server started on port: ${PORT} and in ${config.get("name")} mode`);
  console.log(
    `Server started on port: ${PORT} and in ${config.get("name")} mode`
  );
});

module.exports = app;
module.exports.port = listen.address().port;
