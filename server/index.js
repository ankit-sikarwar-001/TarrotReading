const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;

mongoose.connect(
  "mongodb+srv://ankitsikarwar681:NEoz7PGQ9VBiNvhQ@products.j2edltx.mongodb.net/"
);

const item = require("./Models/ProductModels")
// Middleware to parse JSON
// app.use(express.json());



// Sample API endpoint
// app.get("/products", (req, res) => {
//   res.json([
//     { id: 1, name: "Mystic Tarot Deck", price: 45.99 },
//     { id: 2, name: "Crystal Healing Set", price: 39.99 },
//   ]);
// });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
