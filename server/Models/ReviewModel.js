const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // or String if you're using string IDs
    ref: "Product", 
    required: true,
  },
});
module.exports = mongoose.model("Review", reviewSchema);
