import React, { useState } from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Login from './pages/Login'

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div  onClick={() => menuOpen && setMenuOpen(false)} className='bg-black h-fit w-full'>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />

      </Routes>

<Footer />
    </div>
  )
}

export default App
