const Review = require("../Models/ReviewModel.js");

const addReview = async (req, res) => {
  const productId = req.params.id;

  console.log("Product ID:", productId);
  

  if (!productId) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  
  const { name, comment } = req.body;
  // Validate input data
  if (!name || !comment) {
    return res.status(400).json({ error: "Name and comment are required" });
  }
  try {
    const newReview = new Review({
      name,
      comment,
      productId: productId,
    });
    await newReview.save();
  
    res
      .status(201)
      .json({ message: "Review created successfully", success: true });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: error.message, success: false });
  }
};


const getReviews = async (req, res) => {
  const productId = req.params.id;
  try {
    const reviews = await Review.find({ productId });
    res
      .status(200)
      .json({ reviews:reviews, success: true });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: error.message, success: false });
  }
};





module.exports = {
  addReview,getReviews
};
