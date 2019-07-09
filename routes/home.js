const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize')


// pegar models
const Categoria = require("../models").Category
const Faq = require('../models').Faq

// as rotas

router.get('/', (req, res) => {
    // res.send(lang)
    // console.log('lingua: '+lang)
    // console.log('teste')
    // res.cookie('cookeLang', 'pt', { maxAge: 900000, httpOnly: true });
    res.render('home/index', {
        User: req.user
    })
});

router.get('/servicos', (req, res) => {
    res.render('home/servicos', {
        User: req.user
    })
});

router.get('/planos', (req, res) => {
    res.render('home/planos', {
        User: req.user
    })
});

router.get('/faq', (req, res) => {

    Categoria.findAll({
        include: [{
            model: Faq
        }]
    }).then( dados => {
        // console.log("dados: "+JSON.stringify(dados))
        console.log(dados)
        console.log(dados[1].nomept)
    })

    res.render('home/faq', {
        User: req.user
    })
})

router.get('/faq/:id', (req, res) => {
    /*let id = req.params.id
    console.log("id:" + id)*/
    // faqs.find("")
    res.render('booking/teste', {
        User: req.user,
        id: req.params.id
    })
})

/*router.post('/login',function (req, res) {
    req.body.email
    req.body.senha
    res.send('RECEBIDO')
})*/

module.exports = router;
