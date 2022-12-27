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
const { FieldsError, CommonError } = require("./lib/exception");
const { Error: DatabaseError } = require("mongoose");

const app = express();

// connect to database
connectDB();

// express default bodyparser
app.use(express.json({ extended: false }));

// prevent cors issue
app.use(cors({ origin: "*" }));

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

// catch errors
app.use((err, req, res, next) => {
  try {
    if (config.get("server")) {
      console.log(err);
    }

    switch (true) {
      case err instanceof CommonError:
        return res.status(err.code).json({
          message: err.message,
          code: err.code,
        });
      case err instanceof FieldsError:
        return res.status(400).json({
          message: err.message,
          errors: err.errors,
        });
      case err instanceof DatabaseError.ValidationError: {
        const errors = [];
        Object.keys(err.errors).forEach((key) =>
          errors.push({
            message: err.errors[key].message,
            path: key,
            location: key,
          })
        );
        return res.status(400).json({ message: err.message, errors });
      }
      case err instanceof DatabaseError.MongooseServerSelectionError: {
        return res.status(500).json({ message: "Unable to Conenct Database" });
      }
      default:
        return res.status(500).json({ message: err.message, code: err.code });
    }
  } catch (error) {}
});

const PORT = process.env.PORT || config.get("PORT");

const listen = app.listen(PORT, () => {
  console.log(chalk.blue("url:"), `    http://localhost:${PORT}`);
  console.log(chalk.blue("doc:"), `    http://localhost:${PORT}/api-docs`);
  console.log(chalk.blue("server:"), ` ${config.get("server")}`);
  app.emit("serverStarted");
});

module.exports = app;
module.exports.port = listen.address().port;
