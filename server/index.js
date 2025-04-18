const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Models/ProductModels");

const app = express();
const PORT = process.env.PORT || 5000; // Port for the server

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON

mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@products.j2edltx.mongodb.net/ShopItems`);

// POST API to receive form data
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save product" });
  }
});

// get api
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the products as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" }); // Handle errors
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
