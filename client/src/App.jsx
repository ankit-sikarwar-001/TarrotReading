import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='bg-black h-screen'>
  <Navbar />
<Routes >
   <Route path='/' element={<Home />} />
   <Route path='/shop' element={<Shop />} />
   <Route path='/cart' element={<Cart />} />
   <Route path='/login' element={<Login />} />

</Routes>

      
    </div>
  )
}

export default App
