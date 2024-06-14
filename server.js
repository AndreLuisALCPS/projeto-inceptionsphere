const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/database');
const User = require('./models/user');
const Product = require('./models/product');

// Configure a sessão
app.use(session({
  secret: 'inceptionsphere-secret',
  resave: false,
  saveUninitialized: false
}));

// Configure o body parser para processar dados JSON e URLencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure o Mustache Express para renderização de templates
const mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Definir rotas para autenticação (login, registro, logout)
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Definir rotas para gerenciamento de usuários (perfil, atualização)
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

// Definir rotas para gerenciamento de produtos (adicionar, listar, editar, excluir)
const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

// Rota para a página inicial (index)
app.get('/', (req, res) => {
  if (req.session.userId) {
    // Redirecionar para o perfil do usuário se estiver logado
    res.redirect('/user/profile');
  } else {
    // Renderizar a página inicial para usuários não logados
    res.render('index');
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor InceptionSphere iniciado na porta 3000');
});