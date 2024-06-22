const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

router.get('/products', productController.listProducts);
router.post('/product', productController.addProduct);
router.post('/edit_product', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/edit_product/:id', productController.renderEditProduct);  // Ensure this line exists

module.exports = router;
