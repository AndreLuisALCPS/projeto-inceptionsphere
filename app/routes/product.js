const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

router.get('/products', isAuthenticated, productController.listProducts);
router.post('/product', isAuthenticated, productController.addProduct);
router.delete('/delete/:id', isAuthenticated, productController.deleteProduct);


router.post('/update_product/:id', isAuthenticated, async (req, res) => {
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
router.get('/edit_product/:id', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/login');
        }

        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.redirect('/auth/products');
        }

        res.render('edit_product', { product });
    } catch (err) {
        console.error(err);
        res.redirect('/auth/products');
    }
});


module.exports = router;
