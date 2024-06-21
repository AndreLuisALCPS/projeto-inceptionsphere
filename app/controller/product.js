// Controller product.js
const Produto = require('./model/product');

function cadastrarProduto(req, res) {
    let produto = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
    }
    
    Produto.create(produto).then(() => {
        let sucesso = true;
        res.render("product.html", { sucesso });
    }).catch((err) => {
        console.log(err);
        let erro = true;
        res.render("product.html", { erro });
    });
}

function listarProdutos(req, res) {
    Produto.findAll().then((produtos) => {
        res.json(produtos);
    }).catch((err) => {
        res.json(err);
    });
}

module.exports = {
    cadastrarProduto,
    listarProdutos
}
