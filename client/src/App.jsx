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
import RefundAndCancellation from './pages/RefundAndCancellation'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ServicePolicyAndReturns from './pages/ServicePolicyAndReturns'

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
        <Route path="/refund-and-cancellation" element={<RefundAndCancellation />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/service-policy-and-returns" element={<ServicePolicyAndReturns />} />

      </Routes>

<Footer />
    </div>
  )
}

export default App
