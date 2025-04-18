const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  stocks:Number,
  reviews: Number,
  tags: [String],
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
