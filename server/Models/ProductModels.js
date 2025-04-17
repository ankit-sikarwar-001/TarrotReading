const mongoose = require('mongoose');

const item = new mongoose.Schema({
    productName : String,
    price : Number,
    imageUrl : String,
})
module.exports = mongoose.model('Products',item);