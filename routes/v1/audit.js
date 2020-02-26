const express = require("express");
const router = express.Router();
const Log = require("../../models/Log");

router.get("/", async (req, res) => {
  const logs = await Log.find({})
    .select("_id user application event createdAt")
    .sort({ createdAt: -1 });

  try {
    res.status(201).json({
      success: true,
      logs,
      message: "Successfully get audit logs"
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Server error",
      success: false
    });
  }
});

router.post("/", async (req, res) => {
  const { user, application, action, component, statusCode } = req.body;
  const event = `${action}|${component}|${statusCode}`;
  const newLog = new Log({
    user,
    application,
    event
  });

  await newLog.save();

  try {
    res.status(201).json({
      success: true,
      message: "Successfully save on Audit"
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Server error",
      success: false
    });
  }
});

module.exports = router;
