import React from 'react';
import Cards from '../components/Cards';

const Shop = () => {
  return (
    <div className="flex-grow text-white bg-[rgb(18,18,18)]">
      {/* Title */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold mb-8 text-center">
          <span className="text-[#D4AF37]">✧</span>
          <span className="mx-2">Mystic Shop</span>
          <span className="text-[#D4AF37]">✧</span>
        </h1>
      </div>

      {/* Filter & Sort Container */}
      <div className="mb-8 bg-[#2A2A2A]/30 p-4 rounded-lg container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Filter Title */}
          <h2 className="font-serif text-xl mb-4 md:mb-0">Filter Products</h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 rounded-md text-sm transition-colors bg-[#8A4FFF] text-white">All</button>
            <button className="px-4 py-1.5 rounded-md text-sm transition-colors bg-[#2A2A2A] hover:bg-[#4A3A6A]">Tarot Decks</button>
            <button className="px-4 py-1.5 rounded-md text-sm transition-colors bg-[#2A2A2A] hover:bg-[#4A3A6A]">Crystals</button>
            <button className="px-4 py-1.5 rounded-md text-sm transition-colors bg-[#2A2A2A] hover:bg-[#4A3A6A]">Herbs & Incense</button>
            <button className="px-4 py-1.5 rounded-md text-sm transition-colors bg-[#2A2A2A] hover:bg-[#4A3A6A]">Books</button>
          </div>
        </div>

        {/* Price and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Price Range */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full accent-purple-700"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select className="w-full h-10 px-3 py-2 bg-[#2A2A2A] border border-[#4A3A6A] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-700">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>
      <Cards/>
     
    </div>
  );
};

export default Shop;
