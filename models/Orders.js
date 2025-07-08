const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  userName: String,
  name: String,
  totalItem: Number,
  totalPrice: Number,
  createdAt : Date,
  status: {
    default: 'pending',
    type: String
  }
})

module.exports = mongoose.model('Order', orderSchema);