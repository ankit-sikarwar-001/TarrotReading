import React from 'react'
import { MoonIcon, Menu, X } from "lucide-react"
import { useAuth } from '../appContext/AuthContext';

import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth();

  return (
    <>

      <div className={`text-white flex justify-between h-[50px] items-center px-6 ${menuOpen ? " " : " border-b-2"} sticky top-0 z-10 bg-black `}>
        {/* logo */}
        <div
          onClick={() => {
            navigate("/")
            scrollTo(0, 0)
          }}
          className='flex gap-1 items-center font-bold text-xl cursor-pointer'
        >
          <MoonIcon size={20} color='yellow' className='pt-1 text-yellow-500' />
          <h1><span className='text-yellow-500'>Mystic</span> Tarot</h1>
        </div>

        {/* links for desktop */}
        <div className='md:flex hidden gap-10 text-xl font-medium'>
          <NavLink className="hover:text-yellow-500" onClick={() => {
            navigate("/")
            scrollTo(0, 0)
          }} to="/" >Home</NavLink>
          <span
            onClick={() =>{ navigate("/shop"), scrollTo(0, 0)}}
            className="cursor-pointer hover:text-yellow-500"
          >
            Shop
          </span>
          <span
            onClick={() =>{ navigate("/cart"), scrollTo(0, 0)}}
            className="cursor-pointer hover:text-yellow-500"
          >
            🛒 Cart
          </span>
          {isAuthenticated ? (
            <span
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="cursor-pointer hover:text-red-500"
            >
              Logout
            </span>
          ):(

            <span
            onClick={() =>{ navigate("/login"), scrollTo(0, 0)}}
            className="cursor-pointer hover:text-yellow-500"
            >
            Admin
          </span>
          )}

             </div>

        {/* mobile menu icon and menu */}
        <div className='md:hidden relative'>
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} className='cursor-pointer' />
          ) : (
            <Menu size={28} onClick={() => setMenuOpen(true)} className='cursor-pointer' />
          )}

          {/* full-screen overlay menu */}
          {menuOpen && (
            <div className='fixed top-[50px] left-0 w-full h-fit bg-black text-white flex flex-col pl-5 py-5 border-b-2 border-white font-bold  gap-4 text-xl z-20'>
              <NavLink className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75" to="/" onClick={() => {
                navigate("/"),
                scrollTo(0, 0),
                setMenuOpen(false)
              }}>Home</NavLink>
              <NavLink className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75" to="/shop" onClick={() => {scrollTo(0, 0), setMenuOpen(false)}}>Shop</NavLink>
              <NavLink className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75" to="/cart" onClick={() =>  { scrollTo(0, 0), setMenuOpen(false)} }>🛒Cart</NavLink>
              <NavLink className="hover:bg-[#333333] pl-5 py-2 mr-5 rounded-xl transition-colors duration-75" to="/login" onClick={() => {scrollTo(0, 0), setMenuOpen(false)}}>Admin</NavLink>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default Navbar
