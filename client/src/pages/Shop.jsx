import React, { useContext, useState } from 'react';
import Cards from '../components/Cards';
import { AppContext } from '../appContext/AppContext';

const Shop = () => {
  const { allitems } = useContext(AppContext)
  const [sortOption, setSortOption] = useState('Featured');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
console.log(allitems);

if (allitems.length === 0) {
  return (
    <div className="flex-grow text-white bg-[rgb(18,18,18)] min-h-[80vh] flex flex-col items-center pt-50 px-4 py-20">
      <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">
        ✧ Mystic Shop ✧
      </h1>
      <h2 className="text-xl text-gray-300 mb-2">Currently, the shop is empty</h2>
      <h3 className="text-lg text-gray-500">Magical products are arriving soon...</h3>
    </div>
  );
}

  return (
    <div className="flex-grow text-white bg-[rgb(18,18,18)] ">
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
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Sort Dropdown */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              className="w-full h-10 px-3 py-2 bg-[#2A2A2A] border border-[#4A3A6A] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      <Cards sortOption={sortOption} />
    </div>
  );
};

export default Shop;