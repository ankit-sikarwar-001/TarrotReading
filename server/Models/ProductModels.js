const mongoose = require('mongoose');

const item = new mongoose.Schema({
    productName : String,
    price : Number
})
module.exports = mongoose.model('item',item);