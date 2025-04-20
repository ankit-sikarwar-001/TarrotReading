const express = require("express");
const Visitor = require("../Models/Visitor.js");

const router = express.Router();

// Increment visit count
router.post("/", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const existing = await Visitor.findOne({ date: today });
    if (existing) {
      existing.count += 1;
      await existing.save();
    } else {
      await Visitor.create({ date: today });
    }

    res.status(200).json({ message: "Visit recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get data for chart
router.get("/", async (req, res) => {
  try {
    const visits = await Visitor.find().sort({ date: 1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // 👈 CommonJS export
