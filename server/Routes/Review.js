const express = require("express");
const router = express.Router();

const { addReview, getReviews } = require("../Controllers/ReviewController.js");

router.route("/:id").post(addReview); // POST request to add a review for a specific product    
router.route("/:id").get(getReviews); // GET request to fetch reviews for a specific product
module.exports = router;
