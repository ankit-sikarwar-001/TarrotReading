const { razorpay } = require("./razorpay.js")

const crypto = require("crypto");
const Payment = require("./Models/PaymentModel.js");

const createPaymentOrder = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount,
      currency,
      receipt: `order_rcptid_${Math.random()}`,
    };

    console.log("befor order");

    
    const order = await razorpay.orders.create(options);
console.log("order", order);

    // Save order details in database
    const newPayment = new Payment({
      orderId: order.id,
      amount: amount,
      currency: currency,
    });
  
    await newPayment.save();

    res.json({ mesaage: "order created successfully", order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: error.message });
  }

};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Update payment status in database
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: "Success",
        }
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "Failed" }
      );

      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "not verify payment" });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
