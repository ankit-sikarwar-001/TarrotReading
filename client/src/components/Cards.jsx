import React, { useContext, useState, useEffect} from 'react';
import { AppContext } from '../appContext/AppContext';
import { useNavigate } from 'react-router-dom';
const Cards = ({condi = false}) => {
    const { allitems, totalCartItems, setTotalCartItems } = useContext(AppContext)
    const [filteredItems, setFilteredItems] = useState([]);
    const navigate = useNavigate()
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        let stars = '★'.repeat(fullStars);
        if (hasHalf) stars += '☆';
        return stars.padEnd(5, '☆'); // Always 5 stars
    };

    
    const productDetail = (e, id) => {
        e.preventDefault();
        if(e.target.textContent === "Add to Cart") {
            navigate("/cart"); // Navigate to cart page
            scrollTo(0,0)
            return;
        }
        scrollTo(0,0)
        navigate(`/product/${id}`); // Navigate to product detail page
    }

    const handleToCart = (e, id) => {
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
            scrollTo(0,0)
        } else {
            alert("Product not found");
        }   
    }

    useEffect(() => {
      if (condi) {
        setFilteredItems(allitems.slice(0, 3)); // use `slice` instead of `splice` to avoid mutating the original array
      } else {
        setFilteredItems(allitems);
      }
    }, [condi, allitems]);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto px-4 pb-10">
            {filteredItems.map((product,index) => (
                <div onClick={(e) => productDetail(e,product._id)} key={index} className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md border border-[#2A2A2A]">
                    {/* Image */}
                    <div className="relative">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-2 right-2 flex gap-1">
                            {product.tags.includes("Best") && (
                                <span className="bg-yellow-400 text-xs font-bold text-black px-2 py-0.5 rounded">BEST</span>
                            )}
                            {product.tags.includes("New") && (
                                <span className="bg-purple-600 text-xs font-bold text-white px-2 py-0.5 rounded">NEW</span>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                        <div className="flex items-center text-sm text-gray-300 mt-1 mb-2">
                            <span>{renderStars(product.rating)}</span>
                            <span className="ml-2 text-xs">({product.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-3">{product.description}</p>

                        <div className="flex justify-between items-center">
                            <span className="text-yellow-400 font-bold text-base">${product.price}</span>
                            <button onClick={(e) => handleToCart(e, product._id)} className="bg-purple-700 text-white px-3 py-1.5 text-sm rounded-md hover:bg-purple-800">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
