const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mustacheExpress = require('mustache-express'); // Import mustache-express
const db = require('./app/db');

const app = express();

app.engine('html', mustacheExpress()); // Use mustache-express
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app', 'views')); // Use path.join for compatibility

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for compatibility

// Session configuration
app.use(session({
    secret: 'inceptionsphere_secret',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
}));

// Routes
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const productRouter = require('./app/routes/product');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

// Server initialization
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
