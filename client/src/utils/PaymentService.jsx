import axios from "axios";
import toast from 'react-hot-toast';


const loadRazorpay = async () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handlePayment = (backendUrl, totalPrice) => {
 
  return new Promise(async (resolve, reject) => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error("Failed to load Razorpay SDK.");
      return reject({
        success: false,
        message: "Failed to load Razorpay SDK.",
      });
    }
    console.log(backendUrl);

    try {
      const { data } = await axios.post(`${backendUrl}/api/pay/create-order`, {
        amount: totalPrice * 100,
        currency: "USD",
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Tarot Card Reading",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${backendUrl}/api/pay/verify-payment`,
              response
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful! Order Placed.");
              return resolve({ success: true, message: "Payment successful" });
            } else {
              toast.error("Payment Verification Failed!");
              return resolve({
                success: false,
                message: "Payment verification failed",
              });
            }
          } catch (err) {
            toast.error("Error verifying payment.");
            return reject({ success: false, message: err.message });
          }
        },
        prefill: {
          name: "Sukhdev",
          email: "ssingh66907@gmail.com",
          contact: "9467270938",
        },
        theme: { color: "#3399cc" },
        modal: {
          escape: false,
          ondismiss: function () {
            toast.error("Payment Cancelled.");
            return reject({ success: false, message: "Payment cancelled" });
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
      return reject({ success: false, message: error.message });
    }
  });
};
  
