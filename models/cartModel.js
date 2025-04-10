const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: Object, required: true }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
