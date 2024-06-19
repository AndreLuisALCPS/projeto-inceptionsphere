const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index'); // Render the index.html template
});

module.exports = router;