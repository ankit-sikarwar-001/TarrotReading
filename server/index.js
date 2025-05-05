const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Models/ProductModels");
const admin = require("./Models/Login");
const Order = require("./Models/OrdersModel"); // Import the Order model
const cloudinary = require('./config/cloudinary.js');
const upload = require('./config/multer.js');
const app = express();
const PORT = process.env.PORT || 4000; // Port for the server
const visitorRoutes = require("./Routes/Visitor.js");
const { createPaymentOrder, verifyPayment } = require("./PaymentController.js");
const path = require("path");

const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../client/dist");
app.use(express.static(buildpath));
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON
app.use("/api/visits", visitorRoutes); // for visitors


const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@products.j2edltx.mongodb.net/ShopItems`);
    console.log(`MongoDB connected successfully!`);
  } catch (error) {
    console.error(`Error mongodb connection: ${error.message}`);
    // process.exit(1);
  }
};
connectDB();



// POST API to receive form data
app.post("/api/products", upload.single("image"), async (req, res) => {

  try {
    const {
      rating,
      reviews,
      tags,
      title,
      description,
      price,
      stocks,
    } = req.body;

    // Upload image to cloudinary
    let imageUrl = "";
    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploadRes = await cloudinary.uploader.upload(base64Image, {
        folder: "product_images",
      });

      imageUrl = uploadRes.secure_url;
    }

    const product = new Product({
      title,
      description,
      price,
      rating,
      reviews,
      tags: tags.split(",").map(tag => tag.trim()), // handle comma-separated string
      stocks,
      image: imageUrl,
    });

    await product.save();
    console.log(product);


    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error while saving product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
  // try {
  //   // const product = new Product(req.body);
  //   // await product.save();
  //   console.log("req: ", req);

  //   res.status(201).json({ message: "Product saved successfully!" });
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to save product" });
  // }
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
app.put('/api/products/:id', upload.single('image'),async (req, res) => {
    try {
      const { id } = req.params;

      // 1) Build an update object from req.body
      //    (excluding image—handled separately)
      const {
        title,
        description,
        price,
        rating,
        reviews,
        tags,
        stocks
      } = req.body;

      const updateData = {
        title,
        description,
        price,
        rating,
        reviews,
        stocks,
      };

      // convert comma‑separated tags into array, if present
      if (typeof tags === 'string') {
        updateData.tags = tags.split(',').map(t => t.trim());
      }

      // 2) If a new image file was uploaded, re‑upload to Cloudinary
      if (req.file) {
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const uploadRes = await cloudinary.uploader.upload(base64, {
          folder: 'product_images',
        });
        updateData.image = uploadRes.secure_url;
      }

      // 3) Perform the update
      const updated = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({
        message: 'Product updated successfully',
        product: updated
      });

    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
);

//  ordeer api

// post order
app.post("/api/login", async (req, res) => {
  try {
    const order = new admin(req.body);
    await order.save();
    res.status(201).json({ message: "Admin saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});


// get order
app.get("/api/login", async (req, res) => {
  try {
    const orders = await admin.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send the orders as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" }); // Handle errors
  }
});


app.get("/", (req, res)=> {
  res.send("app running")
})



//  ordeer api




// post order
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save order" });
  }
});


// get order
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send the orders as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" }); // Handle errors
  }
});






// payment api
app.post('/api/pay/create-order', createPaymentOrder)
app.post('/api/pay/verify-payment',  verifyPayment )

// review api
const reviewRoutes = require("./Routes/Review.js");
app.use("/api/reviews", reviewRoutes); // for reviews

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


