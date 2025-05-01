import React, { useState,useEffect } from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import CheckoutPage from './pages/CheckOut'
import ProductForm from './pages/ProductForm'
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/visits`, {
      method: 'POST'
    }).catch(err => console.error("Failed to track visit:", err));
  }, []);


  return (
    <div  onClick={() => menuOpen && setMenuOpen(false)} className='bg-black h-fit w-full'>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

<Footer />
    </div>
  )
}

export default App
