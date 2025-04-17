import React from 'react';
import products from '../components/Products';

const Cards = () => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        let stars = '★'.repeat(fullStars);
        if (hasHalf) stars += '☆';
        return stars.padEnd(5, '☆'); // Always 5 stars
    };

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto px-4 pb-10">
            {products.map((product) => (
                <div key={product.id} className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md border border-[#2A2A2A]">
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
                        <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-yellow-400 font-bold text-base">${product.price.toFixed(2)}</span>
                            <button className="bg-purple-700 text-white px-3 py-1.5 text-sm rounded-md hover:bg-purple-800">
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
