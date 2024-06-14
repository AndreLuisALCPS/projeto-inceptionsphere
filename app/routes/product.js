const express = require('express');
const router = express.Router();
const db = require('../db');
const path = require('path');

router.get('/', (req, res) => {
    db.all(`SELECT * FROM products`, (err, products) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.sendFile(path.join(__dirname, '../views/products.html'));
    });
});

router.get('/add', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    res.sendFile(path.join(__dirname, '../views/product.html'));
});

router.post('/add', (req, res) => {
    const { name, image, description, price } = req.body;
    const userId = req.session.user.id;

    db.run(`INSERT INTO products (name, image, description, price, user_id) VALUES (?, ?, ?, ?, ?)`, [name, image, description, price, userId], (err) => {
        if (err) {
            return res.redirect('/product/add');
        }
        res.redirect('/product');
    });
});

router.get('/edit/:id', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    const productId = req.params.id;

    db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, product) => {
        if (err || !product) {
            return res.sendStatus(404);
        }

        res.sendFile(path.join(__dirname, '../views/edit_product.html'));
    });
});

router.post('/edit/:id', (req, res) => {
    const productId = req.params.id;
    const { name, image, description, price } = req.body;

    db.run(`UPDATE products SET name = ?, image = ?, description = ?, price = ? WHERE id = ?`, [name, image, description, price, productId], (err) => {
        if (err) {
            return res.redirect(`/product/edit/${productId}`);
        }
        res.redirect('/product');
    });
});

router.post('/delete/:id', (req, res) => {
    const productId = req.params.id;

    db.run(`DELETE FROM products WHERE id = ?`, [productId], (err) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.redirect('/product');
    });
});

module.exports = router;
