// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/add', async (req, res) => {
    const { name, image, description, price } = req.body;

    try {
        const newProduct = await Product.create({
            name,
            image, // Ensure this matches the model field
            description,
            price
        });

        res.status(201).redirect('/product');
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Failed to add product');
    }
});

module.exports = router;
