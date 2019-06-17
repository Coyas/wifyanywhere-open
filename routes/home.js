const express = require("express");
const faqs = require("../models/faqs.js")
const router = express.Router();


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
    /*let id = req.params.id
    console.log("id:" + id)*/
    // faqs.find("")
    res.render('home/faq', {
        User: req.user
    })
})

/*router.post('/login',function (req, res) {
    req.body.email
    req.body.senha
    res.send('RECEBIDO')
})*/

module.exports = router;
