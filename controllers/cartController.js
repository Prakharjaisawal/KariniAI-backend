// controllers/cartController.js
const CartItem = require('../models/cartModel');

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const product = req.body;
    // console.log('Product from frontend:', req.body);


    if (!product || !product.Title || !product["Variant SKU"]) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const newItem = new CartItem({product});
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("deleting iteam from cart", id)
    await CartItem.findByIdAndDelete(id);
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
