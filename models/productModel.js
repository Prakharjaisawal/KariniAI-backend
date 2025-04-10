const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Handle: String,
  Title: String,
  Body: String,
  Vendor: String,
  Type: String,
  Tags: String,
  "Option1 Name": String,
  "Option1 Value": String,
  "Option2 Name": String,
  "Option2 Value": String,
  "Option3 Name": String,
  "Option3 Value": String,
  "Variant SKU": { type: String, required: true, unique: true },
  "Variant Grams": Number,
  "Variant Inventory Tracker": String,
  "Variant Inventory Qty": Number,
  "Variant Inventory Policy": String,
  "Variant Fulfillment Service": String,
  "Variant Price": Number,
  "Variant Compare At Price": String,
  "Image Src": String
});

module.exports = mongoose.model('Product', ProductSchema);
