const { CommonError } = require("../../../lib/exception");
const express = require("express");
const config = require("config");
const router = express.Router();

router.route("/").get((req, res, next) => {
  try {
    const version = config.get("version") || undefined;
    if (!version) throw new CommonError({ message: "App version is missing" });
    res.status(200).json({
      version,
      server: config.get("server"),
    });
  } catch (error) {}
});

module.exports = router;
