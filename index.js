const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./app/db');

const app = express();

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/app/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// Configurações de sessão
app.use(session({
    secret: 'inceptionsphere_secret',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
}));

// Rotas
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const productRouter = require('./app/routes/product');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

// Inicialização do servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
