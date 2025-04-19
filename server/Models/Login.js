const mongoose = require("mongoose");

const  orderSchema = new mongoose.Schema({
    admin:String,
    password: String,
});

module.exports = mongoose.model("adminData", orderSchema);
