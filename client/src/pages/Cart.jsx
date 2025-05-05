import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../appContext/AppContext'
import CartItem from '../components/CartItem'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const { allitems, totalCartItems, setTotalCartItems} = useContext(AppContext)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const total = totalCartItems.reduce((sum, product) => {
      const item = allitems.find(i => i. _id === product._id)
      return sum + (item?.price || 0) * (product?.quantity || 1)
    }, 0)
    setTotalPrice(total)
  }, [totalCartItems, allitems])


  // const subtotal = totalPrice
  // const tax = subtotal * 0.05
  // const shipping = subtotal > 0 ? 50 : 0
  // const total = subtotal + tax + shipping


  useEffect(() => {
    if ((totalCartItems.length > 0) && (allitems.length === 0)) {
      localStorage.removeItem("tarotCartItems");
      setTotalCartItems([]);
    }
  }, [allitems]); // ✅ only depend on `allitems`

   
  
  if (totalCartItems.length === 0 || allitems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center  text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <p className="text-gray-300 mb-6 text-center max-w-md">
          Looks like you haven’t added anything to your cart yet. Start browsing our amazing products!
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition px-6 py-2 rounded-md font-medium text-white"
        >
          Go to Products
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <button
        onClick={() => navigate("/")}
        className="text-white hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold text-center text-white mb-6">Your Cart</h1>

      {/* Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {totalCartItems.map((item, index) => (
            <CartItem key={index} productId={item._id} quantity={item.quantity} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit mt-8 lg:mt-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Total price: </span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div> */}
          </div>

          {/* Promo Code */}
          {/* <div className="mt-6">
            <div className="flex flex-col xl:flex-row items-stretch lg:items-center gap-2">
              <input
                type="text"
                placeholder="Promo Code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                Apply
              </button>
            </div>
          </div> */}

          {/* Checkout Button */}
          <button
            onClick={() => {navigate("/checkout"), scrollTo(0,0)}}
            className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
