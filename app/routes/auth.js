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

router.get('/edit_product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.render('edit_product', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to fetch product details' });
    }
});

router.post('/update_product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, description, price } = req.body;

        const updatedProduct = await Product.update(
            { name, image, description, price },
            { where: { id } }
        );

        res.redirect('/auth/products');
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to update product' });
    }
});

router.get('/edit-profile', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/login');
        }

        const user = await User.findByPk(req.session.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.sendFile(path.join(__dirname, '../views/edit-profile.html'));
    } catch (err) {
        console.error(err);
        res.redirect('/auth/profile'); 
    }
});


router.post('/edit-profile', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/login');
        }

        const { email, nickname, country } = req.body;
        const userId = req.session.user.id;

        await User.update({ email, nickname, country }, {
            where: { id: userId }
        });


        const updatedUser = await User.findByPk(userId);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.session.user = updatedUser;

        res.redirect('/auth/profile'); 
    } catch (err) {
        console.error(err);
        res.redirect('/auth/profile'); 
    }
});


module.exports = router;

