const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/user');
const Product = require('../models/product'); 

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/register', async (req, res) => {
    try {
        const { email, nickname, password, country } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        await User.create({
            email,
            nickname,
            password: hashedPassword,
            country
        });

        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/register');
    }
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.redirect('/auth/login');
        }

        req.session.user = user;
        res.redirect('/auth/profile');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    res.sendFile(path.join(__dirname, '../views/profile.html'));
});

router.get('/user-info', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json({
        email: req.session.user.email,
        nickname: req.session.user.nickname,
        country: req.session.user.country
    });
});

router.get('/product', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.sendFile(path.join(__dirname, '../views/product.html'));
});

router.get('/products', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    try {
        const products = await Product.findAll();
        res.render('products', { products });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.post('/product', async (req, res) => {
    try {
        const { name, image, description, price } = req.body;
        await Product.create({ name, image, description, price });
        res.redirect('/auth/products');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/products');
    }
});

module.exports = router;