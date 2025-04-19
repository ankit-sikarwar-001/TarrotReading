import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonialscard = ({ quote, name, rating = 5 }) => {
  return (
    <div className="w-full md:w-[48%] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] text-white rounded-lg p-6 space-y-4 shadow-md">
      <p className="italic text-gray-200">
        <FaQuoteLeft className="inline-block text-yellow-400 mr-2" />
        {quote}
      </p>
      <div className="flex items-center mt-2">
        {[...Array(rating)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400 mr-1" />
        ))}
        <span className="font-semibold ml-3">{name}</span>
      </div>
    </div>
  );
};

export default Testimonialscard;
