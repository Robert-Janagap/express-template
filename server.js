const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const config = require("config");
const debug = require("debug")("server:debug");

const app = express();

// express default bodyparser
app.use(express.json({ extended: false }));

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// request dev logger
app.use(morgan("dev"));

// log all request to access.log
app.use(morgan("combined", { stream: accessLogStream }));

const PORT = process.env.PORT || config.get("PORT");

app.get("", async (req, res) => {
  res.send("hello World");
});

const listen = app.listen(PORT, () => {
  debug(`Server started on port: ${PORT} and in ${config.get("name")} mode`);
  console.log(
    `Server started on port: ${PORT} and in ${config.get("name")} mode`
  );
});

module.exports = app;
module.exports.port = listen.address().port;
