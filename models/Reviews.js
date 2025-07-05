const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: String,
  name: String,
  rating: Number,
  comment: String,
  createdAt : Date
});
module.exports = mongoose.model('Review', reviewSchema);