const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
