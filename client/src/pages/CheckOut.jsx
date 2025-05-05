/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext/AppContext";
import toast from "react-hot-toast";
import { handlePayment } from "../utils/PaymentService";
const CheckoutPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { allitems, totalCartItems, setTotalCartItems } =
    useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalbuy, setTotalBuy] = useState(0);

  const [ pay, setPay ] = useState(false)

  useEffect(() => {
    const total = totalCartItems.reduce((sum, product) => {
      const item = allitems.find((i) => i._id === product._id);
      setTotalBuy((prev) => prev + product.quantity);
      return sum + (item?.price || 0) * (product?.quantity || 1);
    }, 0);
    setTotalPrice(total);
  }, [totalCartItems, allitems]);

  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const placeOrder = async (e) => {
    try {
      e.preventDefault();
      setPay(true)
      // Check for empty fields
      const { firstName, lastName, email } = shippingDetails;
      if (!firstName || !lastName || !email) {
        toast.error("Please fill out all the fields before placing the order.");
        return;
      }

      // email validation 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const paymentData = await handlePayment(backendUrl, totalPrice);
     

    
    if (paymentData.success) {
      const orderData = {
        totalPrice: totalPrice,
        totalbuy: totalbuy,
        products: totalCartItems.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        message: `Hi, I want to place an order. My name is ${firstName} ${lastName} and my email is ${email}`,
      };

      // Convert orderData to a string message
      let message = `${orderData.message}\n\nOrder Summary:\n`;

      orderData.products.forEach((item, index) => {
        message += `${index + 1}. ${item.title} - $${item.price} x ${
          item.quantity
        }\n`;
      });

      message += `\nTotal Buy: ${orderData.totalbuy}\nTotal Price: $${orderData.totalPrice}`;

      const whatsappLink = `https://wa.me/91${
        import.meta.env.VITE_MO
      }?text=${encodeURIComponent(message)}`;

      // Navigate to home
      navigate("/");

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
          const data = await response.json();
          console.log("Order placed successfully:", data);
        } catch (error) {
          console.error("Error placing order:", error);
        }
      };
      // Clear cart
      localStorage.removeItem("tarotCartItems");
      setTotalCartItems([]);

      sendOrderToServer(); // Call the function to send order details to the server
      // 5. Open with 3 fallback methods
      try {
        // Method 1: window.open
        const newWindow = window.open(whatsappLink, "_blank");
        // Method 2: If blocked, use location.href
        if (!newWindow || newWindow.closed) {
          window.location = whatsappLink;
        }
      } catch (e) {
        // Method 3: Create and click hidden link
        const a = document.createElement("a");
        a.href = whatsappLink;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a), 100);
      }
    }
    } catch (error) {
      setPay(false)
      return toast.error(error.message);
    }finally{
      setPay(false)
    }
  };

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-white text-3xl font-bold text-center mb-10">
        {" "}
        <span className="text-[#D4AF37]">✧</span> Secure Checkout{" "}
        <span className="text-[#D4AF37]">✧</span>{" "}
      </h1>
        <div className="lg:w-full p-6 mb-4 bg-[#1a1a1a] shadow-md rounded-lg border border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Disclaimer</h2>
          <p className="text-white text-lg leading-relaxed">
            <span className="font-semibold text-yellow-400">Note:</span> We do not deliver any physical products. Once you complete your purchase, you will be redirected to WhatsApp where our expert will assist you further with your Tarot card reading session.
          </p>
          <p className="mt-4 text-white">
            For any concerns or queries, feel free to contact us directly at{' '}
            <a
              href="mailto:ssingh66907@gmail.com"
              className="text-yellow-400 underline hover:text-yellow-300"
              >
              ssingh66907@gmail.com
            </a>{'.'}
            
          </p>
        </div>
      <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side: Shipping Form */}
        <div className="lg:w-2/3 p-6 bg-white shadow-md rounded-lg">
          {/* <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2> */}

          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
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
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
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
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
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
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md cursor-pointer shadow transition duration-200 ${pay ? "opacity-50 cursor-not-allowed" : ""  
              }`}
            disabled={pay} // Disable the button when pay is true
            >
             {pay ? "Placing Order..." : "Place Order"} 
            </button>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="text-center px-6 py-3 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 transition duration-200 "
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
