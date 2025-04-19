import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../appContext/AppContext';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { allitems, totalCartItems } = useContext(AppContext);
  const { id } = useParams();
  const product = allitems.find((item) => item._id === id);

  if (!product) {
    return <div className="text-white text-center py-20 text-2xl">Product not found</div>;
  }


  const handleToBuy = (e, id) => {
    e.preventDefault();
    const item = allitems.find((item) => item._id === id);
    if (item) {
      const existingItem = totalCartItems.find((cartItem) => cartItem._id === id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
      } else {
        totalCartItems.push({ ...item, quantity: 1 }); // Add new item to cart
      }
      localStorage.setItem("tarotCartItems", JSON.stringify(totalCartItems));
      navigate("/cart"); // Navigate to cart page
      scrollTo(0, 0)
    } else {
      alert("Product not found");
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 text-white ">
      <h2 className="text-4xl font-extrabold mb-8 ml-2 sm:ml-6 border-l-4 border-yellow-500 pl-3">
        Product Detail
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 bg-gray-900 p-6 rounded-2xl shadow-lg">
        {/* Product Image */}
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          <img src={product.image}
            alt={product.title}
            className="w-full max-w-xs md:max-w-sm max-h-72 object-contain rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 w-full flex flex-col gap-5">
          {/* Title */}
          <h1 className="text-xl text-gray-400 italic">{product.title}</h1>

          {/* Price */}
          <p className="text-2xl font-semibold text-yellow-400">${product.price}</p>

          {/* Stock */}
          <p className={`text-sm font-medium ${product.stocks > 0 ? 'text-green-400' : 'text-red-500'}`}>
            {product.stocks > 0 ? `In Stock: ${product.stocks}` : 'Out of Stock'}
          </p>

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
            disabled={product.stock === 0}
          >
            Buy Now
          </button>



          {/* Rating & Reviews */}
          {product.rating && product.reviews && (
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center text-yellow-400 text-lg">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < Math.round(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                {product.rating.toFixed(1)} ( { product.reviews} Reviews )
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
