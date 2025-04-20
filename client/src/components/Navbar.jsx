import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../appContext/AuthContext'; // Update path as needed

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleNavClick = (path) => {
    navigate(path);
    scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    scrollTo(0, 0);
  };

  return (
    <div className={`text-white flex justify-between h-[50px] items-center px-6 ${menuOpen ? "" : "border-b-2"} sticky top-0 z-10 bg-black`}>

      {/* Logo */}
      <div
        onClick={() => handleNavClick('/')}
        className='flex gap-1 items-center font-bold text-xl cursor-pointer'
      >
        <span className='text-yellow-500 pt-1'>🌙</span>
        <h1><span className='text-yellow-500'>Mystic</span> Tarot</h1>
      </div>

      {/* Desktop Links */}
      <div className='md:flex hidden gap-10 text-xl font-medium'>
        <NavLink className="hover:text-yellow-500" to="/">Home</NavLink>
        <NavLink className="hover:text-yellow-500" to="/shop">Shop</NavLink>
        <NavLink className="hover:text-yellow-500" to="/cart">🛒 Cart</NavLink>

        {isAuthenticated && (
          <NavLink className="hover:text-yellow-500" to="/admin">Admin</NavLink>
        )}

        {isAuthenticated ? (
          <span onClick={handleLogout} className="cursor-pointer hover:text-red-400">Logout</span>
        ) : (
          <NavLink className="hover:text-yellow-500" to="/login">Admin</NavLink>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className='md:hidden relative'>
        <span
          onClick={() => setMenuOpen(!menuOpen)}
          className='text-2xl cursor-pointer'
        >
          {menuOpen ? '✖️' : '☰'}
        </span>

        {/* Mobile Overlay Menu */}
        {menuOpen && (
          <div className='fixed top-[50px] left-0 w-full bg-black text-white flex flex-col pl-5 py-5 border-b-2 border-white font-bold gap-4 text-xl z-20'>
            <NavLink
              className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75"
              to="/"
              onClick={() => {
                setMenuOpen(false);
                scrollTo(0, 0);
              }}
            >Home</NavLink>

            <NavLink
              className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75"
              to="/shop"
              onClick={() => {
                setMenuOpen(false);
                scrollTo(0, 0);
              }}
            >Shop</NavLink>

            <NavLink
              className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75"
              to="/cart"
              onClick={() => {
                setMenuOpen(false);
                scrollTo(0, 0);
              }}
            >🛒 Cart</NavLink>

            {isAuthenticated && (
              <NavLink
                className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75"
                to="/admin"
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo(0, 0);
                }}
              >Admin</NavLink>
            )}

            {isAuthenticated ? (
              <span
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="pl-5 py-2 mr-5 rounded-xl cursor-pointer hover:bg-[#333333]"
              >
                Logout
              </span>
            ) : (
              <NavLink
                className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75"
                to="/login"
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo(0, 0);
                }}
              >Admin</NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
