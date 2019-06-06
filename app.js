/**************carregando modulos****************/
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const createError = require('http-errors');

const home = require('./routes/home');
const user = require('./routes/user');
const booking = require('./routes/booking');
const favicon = require('serve-favicon');


let FacebookStrategy = require ('passport-facebook');

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

// Body Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// static files
app.use(express.static(path.join(__dirname,"public")))

// servir o favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/************* Rotas***********************/

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
/************************************facebook*************************************/
/*app.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));*/

module.exports = app;