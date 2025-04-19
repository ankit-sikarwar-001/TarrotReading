import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../appContext/AppContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { allitems, totalCartItems, setTotalCartItems } = useContext(AppContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalbuy, setTotalBuy] = useState(0)

  useEffect(() => {
    const total = totalCartItems.reduce((sum, product) => {
      const item = allitems.find(i => i._id === product._id)
      setTotalBuy(prev => prev + product.quantity)
      return sum + (item?.price || 0) * (product?.quantity || 1)
    }, 0)
    setTotalPrice(total)
  }, [totalCartItems, allitems])


  const navigate = useNavigate()
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });


  const placeOrder = (e) => {
    e.preventDefault();

    // Check for empty fields
    const { firstName, lastName, email } = shippingDetails;
    if (!firstName || !lastName || !email) {
      toast.error("Please fill out all the fields before placing the order.");
      return;
    }


    // Show success message
    toast.success("Order placed successfully!");

    // Clear cart
    localStorage.removeItem("tarotCartItems");
    setTotalCartItems([]);

    // WhatsApp link
    //  store in database Revenue   and Total Orders
    //  const orderData = {
    //   totalPrice: totalPrice,
    //   totalbuy: totalbuy,
    //   products: totalCartItems.map(item => ({
    //    title: item.title,
    //     price: item.price,
    //     quantity: item.quantity
    //   })),
    //   message: `Hi, I want to place an order. My name is ${firstName} ${lastName} and my email is ${email}`,
    //   };
    // const whatsappLink = `https://wa.me/917206029022?text=${encodeURIComponent(...orderData)}`;

    // // Redirect to WhatsApp
    // window.open(whatsappLink, "_blank");


    const orderData = {
      totalPrice: totalPrice,
      totalbuy: totalbuy,
      products: totalCartItems.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      message: `Hi, I want to place an order. My name is ${firstName} ${lastName} and my email is ${email}`,
    };

    // Convert orderData to a string message
    let message = `${orderData.message}\n\nOrder Summary:\n`;

    orderData.products.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ₹${item.price} x ${item.quantity}\n`;
    });

    message += `\nTotal Buy: ${orderData.totalbuy}\nTotal Price: ₹${orderData.totalPrice}`;

    const whatsappLink = `https://wa.me/918168584557?text=${encodeURIComponent(message)}`;

    // Example: redirect to WhatsApp
    window.open(whatsappLink, "_blank");


    // Navigate to home
    navigate("/");


    //   payment process



    // orders database 
    const orderDetails = {
      totalPrice: totalPrice,
      totalorders: totalbuy,
    };



    // Send order details to the server
    const sendOrderToServer = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });
        console.log("response:", response);
        const data = await response.json();
        console.log("data:", data);
        console.log("Order placed successfully:", data);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }




    sendOrderToServer(); // Call the function to send order details to the server
  };



  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto p-6 ">
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
                  required
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
                  required
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
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

        </div>

        {/* Right side: Order Summary */}
        <div className="lg:w-1/3 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">

            <div className="flex justify-between font-bold mb-6">
              <p>Total Price:</p>
              <p>${totalPrice}</p>
            </div>
            <button
              onClick={placeOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow transition duration-200"
            >
              Place Order
            </button>

          </div>

          <button
            onClick={() => navigate("/cart")}
            className="text-center px-6 py-3 bg-gray-300 rounded-md"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
