/**************carregando modulos****************/
const express = require('express');
const exphbs = require ('express-handlebars');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require('path');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const passport = require('passport')
const MySQLStore = require('express-mysql-session')(session)
const expressValidador = require('express-validator')
//pasport autenticate pakages
const passportSetup =  require('./config/passport-config')
const keys = require('./config/keys.json')

// traducao
const i18n = require('i18n-express')

/***** importar rotas */
const home      = require('./routes/home')
const user      = require('./routes/user')
const booking   = require('./routes/booking')
const pagamento = require('./routes/pagamento')
const auth      = require('./routes/auth')
const faq       = require('./routes/faq')

// console testes

//init express
const app = express();
// require('dotenv').config();
// console.log("variaveis do hanbiente do appjs")
// console.log(process.env.DBNAME)
// console.log(process.env.HOST)
// console.log(process.env.USERS)
// console.log(process.env.DB_PASSWORD)
// console.log("fim variaveis do hanbiente do appjs")

// create a database sessionStorage
let options = {
    host: keys.server.host,
    user: keys.server.user,
    password: keys.server.pass,
    database: keys.server.dbname,
    // socketPath: '/var/lib/mysql/mysql.sock'  //use isso, se houver error connrefused
};

/*********** cria uma tabela para guardar sessao no banco de dados **********/
let sessionStore = new MySQLStore(options);


/***************configurações***************/
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    // create helpers   
    helpers: {
        if_equal: (translation ,lang, b, opts) => {
            if (lang === b) {
                if(lang === 'pt'){
                    this.translation = {
                        'pt': 'POR',
                        'en': 'ING',
                        'fr': 'FRA'
                    }
                } else if(lang === 'en'){
                    this.translation = {
                        'pt': 'POR',
                        'en': 'ENG',
                        'fr': 'FRE'
                    }
                }else if(lang === 'fr') {
                    this.translation = {
                        'pt': 'POR',
                        'en': 'ANG',
                        'fr': 'FRA'
                    }
                }
                return opts.fn(this)
            } 
            // else {
                // return opts.inverse(this)
            // }
        }
    }
})
//handlebars
app.engine('handlebars', hbs.engine )
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// esta linha tem de ser depois de qq bodyParser middlewares
app.use(expressValidador());

app.use(cookieParser());

app.use(session({
    key: 'wifianywhere',
    secret: 'qsqdqsjhqsdjkdq',
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    // cookie: { secure: true}  //for https
}));

// static files
app.use(express.static(path.join(__dirname,"public")))

// servir o favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/************* Rotas***********************/

app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
    siteLangs: ["en","fr", "pt"],
    textsVarName: 'translation',
    browserEnable: true,  //cria cookie mesmo sem iniciar sessao
    defaultLang: 'pt',
    paramLangName: 'clang',
    // textsVarName: 'lang'
    // cookie: 'cookeLang'
}));

// iniciar o passport
app.use(passport.initialize()) 
app.use(passport.session())

// rota do index
app.use('/', home)
// rotas do user
app.use('/users', user)
// rota para o bookin online
app.use('/booking', booking)
//rota do pagamento
app.use('/pagamento', pagamento)
//rota das autenticacoes
app.use('/auth', auth)
//rota para faqs
app.use('/faq', faq)


// rota do 404 (catch 404 and forward to error handler)
app.use( function(req, res, next) {
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
    res.render('error', {User: req.user});
});


module.exports = app;