const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { findAllImage } = require("./controllers/image.controller");

router
  .route("/")
  .get(
    [
      check("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 64 })
        .withMessage("Name length should be in between 2 and 64"),
    ],
    findAllImage
  );

module.exports = router;
