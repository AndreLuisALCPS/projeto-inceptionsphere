const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const db = require('./db');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
