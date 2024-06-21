const express = require('express');
const session = require('express-session');
const path = require('path');
const mustacheExpress = require('mustache-express');
const db = require('./app/db');

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'inceptionsphere_secret',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
}));

const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth'); // Ensure path is correct
const productRouter = require('./app/routes/product'); // Ensure path is correct

app.use('/', indexRouter);
app.use('/auth', authRouter); // Ensure this line is present and correct
app.use('/product', productRouter);

db.sync(() => console.log(`Database: ON`));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
