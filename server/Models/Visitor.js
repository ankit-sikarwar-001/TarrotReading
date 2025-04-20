const mongoose = require("mongoose");


const visitorSchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);
