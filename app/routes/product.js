const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

router.get('/products', productController.listProducts);
router.post('/product', productController.addProduct);
router.delete('/delete/:id', productController.deleteProduct);

router.get('/edit_product/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (product) {
            res.render('edit_product', { product });
        } else {
            res.redirect('/auth/products');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/auth/products');
    }
});

module.exports = router;
