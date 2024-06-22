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

exports.editProduct = async (req, res) => {
    try {
        const { id, name, image, description, price } = req.body;
        await Product.update({ name, image, description, price }, {
            where: { id }
        });
        res.redirect('/auth/products');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/products');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({
            where: { id }
        });
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to delete product' });
    }
};

exports.renderEditProduct = async (req, res) => {
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
};