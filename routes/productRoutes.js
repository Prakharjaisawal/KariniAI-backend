const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// get all product
router.get('/', productController.getProducts);

// get product from chat 
router.get('/chat', productController.getProductFromChat)



module.exports = router;
