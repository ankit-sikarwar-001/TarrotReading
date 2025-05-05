import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../appContext/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState({
    name: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { allitems, totalCartItems } = useContext(AppContext);
  const { id } = useParams();
  const product = allitems.find((item) => item._id === id);

  const [reviewsList, setReviewsList] = useState([]);

 
const fetchReviews = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/reviews/${product._id}`
    );
    setReviewsList(data.reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

useEffect(() => {
  if (product) {
    fetchReviews();
  }
}, [product]);

  if (!product) {
    return (
      <div className="text-white text-center py-20 text-2xl">
        Product not found
      </div>
    );
  }


  

  const handleToBuy = (e, id) => {
    e.preventDefault();
    const item = allitems.find((item) => item._id === id);
    if (item) {
      const existingItem = totalCartItems.find(
        (cartItem) => cartItem._id === id
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
      } else {
        totalCartItems.push({ ...item, quantity: 1 }); // Add new item to cart
      }
      localStorage.setItem("tarotCartItems", JSON.stringify(totalCartItems));
      navigate("/cart"); // Navigate to cart page
      scrollTo(0, 0);
    } else {
      alert("Product not found");
    }
  };

  const handleReviewChange = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (reviews.name.trim() === "" || reviews.comment.trim() === "") {
      toast.error("Please fill in all fields.");
      setLoading(false); // Reset loading state
      return;
    }
    const reviewData = {
      name: reviews.name.trim(),
      comment: reviews.comment.trim(),
    };

    // Make a POST request to your backend API to save the review

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/reviews/${product._id}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setReviews({ name: "", comment: "" }); // Reset the form fields
      } else {
        toast.error(data.message);
        setReviews({ name: "", comment: "" }); // Reset the form fields
      }
    } catch (error) {
      toast.error("Error submitting review. Please try again later.");
      toast.error(data.message);
      console.error("Error submitting review:", error);
    } finally {
      setReviews({ name: "", comment: "" }); // Reset the form fields
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 text-white ">
      <h2 className="text-4xl font-extrabold mb-8 ml-2 sm:ml-6 border-l-4 border-yellow-500 pl-3">
        Product Detail
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 bg-gray-900 p-6 rounded-2xl shadow-lg">
        {/* Product Image */}
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-xs md:max-w-sm max-h-72 object-contain rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 w-full flex flex-col gap-5">
          {/* Title */}
          <h1 className="text-xl text-gray-400 italic">{product.title}</h1>

          {/* Price */}
          <p className="text-2xl font-semibold text-yellow-400">
            ${product.price}
          </p>

          {/* Stock */}
          {/* <p className={`text-sm font-medium ${product.stocks > 0 ? 'text-green-400' : 'text-red-500'}`}>
            {product.stocks > 0 ? `In Stock: ${product.stocks}` : 'Out of Stock'}
          </p> */}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-xs text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Buy Now */}
          <button
            onClick={(e) => handleToBuy(e, product._id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 w-fit disabled:opacity-50"
            // disabled={product.stock === 0}
          >
            Buy Now
          </button>

          {/* Rating & Reviews */}
          {product.rating && product.reviews && (
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center text-yellow-400 text-lg">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < Math.round(product.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                {product.rating.toFixed(1)} ( {product.reviews} Reviews )
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-lg">
            {product.description}
          </p>
        </div>
      </div>
      {/* review from users*/}
      <div>
        {/* show reviews */}
        {reviewsList.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviewsList.map((review, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-yellow-400 font-semibold">{review.name}</p>
                  <p className="text-white mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mt-10">No reviews yet.</p>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5 ml-1 sm:ml-0">Add a Review</h2>
          <form
            className="bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-2xl"
            onSubmit={(e) => handleReviewChange(e)}
          >
            <div className="mb-4">
              <label
                className="block text-gray-300 mb-2 text-sm sm:text-base"
                htmlFor="user"
              >
                Your Name
              </label>
              <input
                type="text"
                id="user"
                className="w-full p-2 sm:p-3 bg-gray-700 text-white rounded-lg text-sm sm:text-base"
                placeholder="Enter your name"
                onChange={(e) =>
                  setReviews({ ...reviews, name: e.target.value })
                }
                value={reviews.name}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 mb-2 text-sm sm:text-base"
                htmlFor="comment"
              >
                Your Review
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full p-2 sm:p-3 bg-gray-700 text-white rounded-lg text-sm sm:text-base"
                placeholder="Write your review here..."
                onChange={(e) =>
                  setReviews({ ...reviews, comment: e.target.value })
                }
                value={reviews.comment}
              ></textarea>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm sm:text-base ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
