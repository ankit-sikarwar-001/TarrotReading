const mongoose = require("mongoose");

const  orderSchema = new mongoose.Schema({
    totalPrice:Number,
    totalorders: Number,
});

module.exports = mongoose.model("Order", orderSchema);
