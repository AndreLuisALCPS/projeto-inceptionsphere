const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    try {
        const { name, image, description, price } = req.body;
        await Product.create({ name, image, description, price });
        res.redirect('/auth/products');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/products');
    }
};

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('products', { products });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await Product.destroy({
            where: { id }
        });
        if (deletedCount === 0) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to delete product' });
    }
};