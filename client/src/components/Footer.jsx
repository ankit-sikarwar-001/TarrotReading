import React from 'react';
import { MoonIcon } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white w-full mt-40">
      <hr className="border-white opacity-20" />
      
      <div className="bg-purple-500 text-black py-10 px-6 md:px-20 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Logo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xl font-bold">
            <MoonIcon size={24} className="text-yellow-500" />
            <h1>
              <span className="text-yellow-500">Mystic</span> Tarot
            </h1>
          </div>
          <p className="text-sm">Discover the mysteries of your future with our premium tarot products and spiritual items</p>
          <div className='flex gap-5'>
<FaFacebook size={24} />
<FaTwitter size={24} />
<FaInstagram  size={24}/>
<FaYoutube size={24}  />
          </div>
        </div>

        {/* Shop Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-1">Shop</h2>
          <p>Tarot Decks</p>
          <p>Crystals</p>
          <p>Herbs & Incense</p>
          <p>Books</p>
          <p>Gift Cards</p>
        </div>

        {/* Information Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-1">Information</h2>
          <p>About Us</p>
          <p>Tarot Reading Guide</p>
          <p>Shipping and Returns</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-3 max-w-sm">
          <h2 className="text-lg font-semibold mb-1">Newsletter</h2>
          <p className="text-sm">
            Subscribe to receive updates, exclusive offers, and mystical insights.
          </p>
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="border-white opacity-20" />
      
      <div className="py-4 px-6 md:px-20 text-center text-sm bg-blue-700">
        <p>© 2025 Mystic Tarot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
