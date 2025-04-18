import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../appContext/AppContext';

const CheckoutPage = () => {

 const { allitems, setAllItems, totalCartItems, setTotalCartItems} = useContext(AppContext)
  const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
      const total = totalCartItems.reduce((sum, product) => {
        const item = allitems.find(i => i.id === product.id)
        return sum + (item?.price || 0) * (product?.quantity || 1)
      }, 0)
      setTotalPrice(total)
    }, [totalCartItems, allitems])
  

    const navigate = useNavigate()
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto p-6">
        <h1 className='text-white text-3xl font-bold text-center mb-10'> <span className="text-[#D4AF37]">✧</span> Secure Checkout <span className="text-[#D4AF37]">✧</span> </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Shipping Form */}
        <div className="lg:w-2/3 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={shippingDetails.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={shippingDetails.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="streetAddress" className="block text-sm font-medium">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={shippingDetails.streetAddress}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium">State/Province</label>
                <select
                  id="state"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select state</option>
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="postalCode" className="block text-sm font-medium">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium">Payment Method</label>
              <div className="flex gap-4 mb-4">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    checked={paymentMethod === "Credit Card"}
                    onChange={() => setPaymentMethod("Credit Card")}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={() => setPaymentMethod("PayPal")}
                    className="mr-2"
                  />
                  PayPal
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Shop Pay"
                    checked={paymentMethod === "Shop Pay"}
                    onChange={() => setPaymentMethod("Shop Pay")}
                    className="mr-2"
                  />
                  Shop Pay
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right side: Order Summary */}
        <div className="lg:w-1/3 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p>1x Astrology Almanac</p>
              <p>$22.99 each</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>$22.99</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p>$5.99</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Tax</p>
              <p>$1.84</p>
            </div>
            <div className="flex justify-between font-bold mb-6">
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-md mb-6">
              Place Order
            </button>
            <p className="text-sm text-center">
              By placing your order, you agree to our <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
            </p>
          </div>

          <button onClick={() => navigate("/cart")} className="w-full text-center py-3 bg-gray-300 rounded-md">
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
