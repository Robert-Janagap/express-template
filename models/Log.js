const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    application: {
      type: String,
      trim: true,
      required: true,
      lowercase: true
    },
    event: {
      type: String,
      trim: true,
      required: true,
      lowercase: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt"
    }
  }
);

module.exports = Log = mongoose.model("log", LogSchema);
