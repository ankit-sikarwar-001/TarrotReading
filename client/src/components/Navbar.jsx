import React from 'react'
import { MoonIcon } from "lucide-react"
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
  <>
        <div className='text-white  flex justify-between bg-gray-500 h-[50px] items-center px-6'>
            {/* logo */}
            <div className='flex gap-2 items-center font-bold text-xl'>
             <MoonIcon size={24} color='yellow' />  <h1><span className='text-yellow-500'>Mystic</span> Tarot</h1> 
            </div>

            {/* links */}
            <div className='flex gap-4 text-xl font-medium'>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/login">Admin</NavLink>
            </div>

        </div>
  </>
  )
}

export default Navbar
