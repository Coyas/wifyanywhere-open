const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const Categoria = require('./models').categoria
const Faqs = require('./models').faqs

Categoria.create({
    nomept: 'terrs',
    nomeen: 'sqsdqs',
    nomefr: 'fdds'
}).then( cate => {
    cate.createfaqs({
        title: "teste terra",
        descricao: "dqsdsddqs dsd qd qd qdqq"
    }).then( () => console.log('funcionou'))
})

// Shop.create({
// 	name: 'Starbucks'
// }).then(shop => {
// 	shop.createCoffee({
// 		name: 'Columbian',
// 		type: 'Dark'
// 	}).then(() => console.log('Worked!'));
// });

// Shop.findAll({
// 	include: [Coffee]
// }).then(shops => {
// 	console.log(shops[0].Coffees);
// });


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
// app.get('/', (req, res) => {
// 	// Shop.findAll({
// 	// 	include: [Coffee]
// 	// }).then(shops => {
// 		res.render('home/teste');
// 	// });
// });

// app.post('/shops', (req, res) => {
// 	Shop.create(req.body)
// 		.then(() => res.redirect('/'));
// });

// app.post('/coffee/:shop_id', (req, res) => {
// 	Coffee.create({...req.body, shopId: req.params.shop_id})
// 		.then(() => res.redirect('/'));
// });

app.listen(5000, () => console.log('Listening on port 5000'));