import React from 'react';
import { MoonIcon } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white w-full mt-0">
      <hr className="border-white opacity-20" />

      <div className="bg-purple-500 text-black py-10 px-6 md:px-20 flex flex-col md:flex-row justify-between gap-10">

        {/* Logo & About */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xl font-bold">
            <MoonIcon size={24} className="text-yellow-500" />
            <h1>
              <span className="text-yellow-500">Mystic</span> Tarot
            </h1>
          </div>
          <p className="text-sm">
            Discover the mysteries of your future with our premium tarot products and spiritual items.
          </p>
          <div className='flex gap-5'>
            <FaFacebook size={24} />
            <FaTwitter size={24} />
            <FaInstagram size={24} />
            <FaYoutube size={24} />
          </div>
        </div>

        {/* Shop Section */}
        {/* <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-1">Shop</h2>
          <p>Tarot Decks</p>
          <p>Crystals</p>
          <p>Books</p>
        </div> */}

        {/* Legal Pages & Info */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-1">Information</h2>
          <Link to="/service-policy-and-returns" className="block hover:underline">Service Policy & Returns</Link>
          <Link to="/privacy-policy" className="block hover:underline">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="block hover:underline">Terms & Conditions</Link>
          <Link to="/refund-and-cancellation" className="block hover:underline">Refund & Cancellation</Link>
        </div>

        {/* Contact & Legal */}
        <div className="space-y-2 text-sm">
          <h2 className="text-lg font-semibold mb-1">Contact</h2>
          <p><strong>Name:</strong> Sukhdev</p>
          <p><strong>Email:</strong> ssingh66907@gmail.com</p>
          <p><strong>Business Name:</strong> Mystic Tarot (Owned by Sukhdev)</p>
          <p><strong>Registered Address:</strong> VPO Khardwal Teh Narwana <br />126116, District Jind , Haryana</p>
        </div>
      </div>

      <hr className="border-white opacity-20" />

      <div className="py-4 px-6 md:px-20 text-center text-sm bg-blue-700">
        <p>© 2025 Mystic Tarot. All rights reserved.</p>
        <p>
          Developed by <a href="https://ankitxwarportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className=" hover:text-yellow-300">Ankit Singh</a> &{' '}
          <a href="https://ajaygodara-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className=" hover:text-yellow-300">Ajay Godara</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
