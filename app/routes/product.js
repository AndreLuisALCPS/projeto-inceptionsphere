const express = require('express');
const router = express.Router();
const Product = require('../models/product');
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving products' });
    }
});

module.exports = router;

