//carregando modulos
const express = require('express')
const exphbs = require ('express-handlebars')
const path = require('path')
const app = express()
const port = 3000

//configurações
    //handlebars
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,"public")))

//rotas
   app.engine('handlebars', exphbs());
   app.get('/', function (req, res) {
    res.render('index');
});



app.listen(port, () => console.log(`Ola Bella Servidor iniciado porta ${port}!`))

