// product.js (Express route handler)
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/add', async (req, res) => {
    const { name, image, description, price } = req.body;

    try {
        const newProduct = await Product.create({
            name,
            image,
            description,
            price
        });

        res.status(201).json(newProduct); // Respond with the created product
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

module.exports = router;
