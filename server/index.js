const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Models/ProductModels");

const app = express();
const PORT = process.env.PORT;

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

// DELETE product by ID
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// UPDATE product by ID
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
