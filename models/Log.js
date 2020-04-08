const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

module.exports = Test = mongoose.model("test", testSchema);
