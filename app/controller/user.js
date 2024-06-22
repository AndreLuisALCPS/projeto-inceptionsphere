const Usuario = require('./model/user');

function cadastrarUsuario(req, res) {
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento
    }
    
    Usuario.create(usuario).then(() => {
        let sucesso = true;
        res.render("register.html", { sucesso });
    }).catch((err) => {
        console.log(err);
        let erro = true;
        res.render("register.html", { erro });
    });
}

function listarUsuarios(req, res) {
    Usuario.findAll().then((usuarios) => {
        res.json(usuarios);
    }).catch((err) => {
        res.json(err);
    });
}

function editarUsuario(req, res) {
    let usuarioId = req.params.id; // Assuming the ID is passed as a route parameter
    let novosDados = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento
    };

    Usuario.update(novosDados, {
        where: { id: usuarioId }
    }).then((resultado) => {
        if (resultado[0] === 1) {
            res.json({ mensagem: `Usuário com ID ${usuarioId} atualizado com sucesso.` });
        } else {
            res.status(404).json({ erro: `Usuário com ID ${usuarioId} não encontrado.` });
        }
    }).catch((err) => {
        res.status(500).json({ erro: "Erro ao atualizar usuário." });
    });
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    editarUsuario
};
