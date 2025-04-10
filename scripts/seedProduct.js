// scripts/seedProducts.js
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const data = require('../data/data.json');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(data.filter(p => p.Title && p["Variant Price"]));
    console.log('Database seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
