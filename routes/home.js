const express = require("express");
const router = express.Router();


// pegar models
const Categoria = require("../models").Category
const Faqs = require("../models").Faq
const Despositivo = require('../models').Device
const Planos = require('../models').Plan
const Bookins = require('../models').Booking

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
