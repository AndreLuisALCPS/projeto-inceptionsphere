const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/register', (req, res) => {
    const { email, nickname, password, country } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(`INSERT INTO users (email, nickname, password, country) VALUES (?, ?, ?, ?)`, [email, nickname, hashedPassword, country], (err) => {
        if (err) {
            return res.redirect('/auth/register');
        }
        res.redirect('/auth/login');
    });
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            return res.redirect('/auth/login');
        }

        req.session.user = user;
        res.redirect('/profile');
    });
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

module.exports = router;
