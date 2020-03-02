const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true
    },
    application: {
      type: String,
      trim: true,
      lowercase: true
    },
    event: {
      type: String,
      trim: true,
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
