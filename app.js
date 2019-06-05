/**************carregando modulos****************/
const express = require('express');
const exphbs = require ('express-handlebars');
const path = require('path');
const createError = require('http-errors');
// traducao
const i18n = require('i18n-express')

const home = require('./routes/home');
const user = require('./routes/user');
const booking = require('./routes/booking');
const favicon = require('serve-favicon');


const app = express();
require('dotenv').config();
console.log(process.env.DBNAME)
console.log(process.env.HOST)
console.log(process.env.USERS)
console.log(process.env.DB_PASSWORD)

/***************configurações***************/

//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}) )
app.set('view engine', 'handlebars');

// static files
app.use(express.static(path.join(__dirname,"public")))

// servir o favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/************* Rotas***********************/

app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
    siteLangs: ["en","fr", "pt"],
    textsVarName: 'translation',
    browserEnable: true,
    defaultLang: 'pt',
    paramLangName: 'clang',

}));

// rota do index
app.use('/', home);
// rotas do user
app.use('/users', user);
// rota para o bookin online
app.use('/booking', booking);


// rota do 404 (catch 404 and forward to error handler)
app.use(function(req, res, next) {
    next(createError(404));
});


/******** OUTROS  *****************/
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;