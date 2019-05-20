/**************carregando modulos****************/
const express = require('express')
const exphbs = require ('express-handlebars')
const path = require('path')
const createError = require('http-errors');
const app = express()
const home = require('./routes/home')
const user = require('./routes/user')

/***************configurações***************/

//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}) )
app.set('view engine', 'handlebars');


// static files
app.use(express.static(path.join(__dirname,"public")))

/************* Rotas***********************/

// rota do index
app.use('/', home)
// rotas do user
app.use('/users', user)
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