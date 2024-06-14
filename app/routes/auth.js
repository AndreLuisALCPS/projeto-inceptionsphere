const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { email, nickname, password, country } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.run('INSERT INTO users (email, nickname, password, country) VALUES (?, ?, ?, ?)', 
    [email, nickname, hash, country], function(err) {
        if (err) {
            return res.send('Error registering user');
        }
        res.redirect('/auth/login');
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            return res.send('Invalid credentials');
        }

        req.session.userId = user.id;
        res.redirect('/auth/profile');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }

    db.get('SELECT * FROM users WHERE id = ?', [req.session.userId], (err, user) => {
        if (err || !user) {
            return res.send('User not found');
        }

        res.render('profile', { user });
    });
});

module.exports = router;
