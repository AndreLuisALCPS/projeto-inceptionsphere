const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.all('SELECT * FROM products', (err, products) => {
        if (err) {
            return res.send('Error retrieving products');
        }
        res.render('products', { products });
    });
});

router.get('/add', (req, res) => {
    res.render('product');
});

router.post('/add', (req, res) => {
    const { name, image, description, price } = req.body;

    db.run('INSERT INTO products (name, image, description, price) VALUES (?, ?, ?, ?)', 
    [name, image, description, price], function(err) {
        if (err) {
            return res.send('Error adding product');
        }
        res.redirect('/product');
    });
});

router.get('/edit/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, product) => {
        if (err || !product) {
            return res.send('Product not found');
        }
        res.render('edit_product', { product });
    });
});

router.post('/edit/:id', (req, res) => {
    const { name, image, description, price } = req.body;

    db.run('UPDATE products SET name = ?, image = ?, description = ?, price = ? WHERE id = ?', 
    [name, image, description, price, req.params.id], function(err) {
        if (err) {
            return res.send('Error updating product');
        }
        res.redirect('/product');
    });
});

router.post('/delete/:id', (req, res) => {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.send('Error deleting product');
        }
        res.redirect('/product');
    });
});

module.exports = router;
