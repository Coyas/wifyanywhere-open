const express = require("express");
const faqs = require("../models/faqs.js")
const router = express.Router();

/***auth login***/
router.get('/login',(req,res)=>{
    res.render('login');
});

/***auth logout***/
router.get('/logout',(req,res)=>{
    res.send('logout out');
});

/***auth with facebook***/
router.get('/facebook',(req,res)=>{
    //handle with passport
    res.send('logging in with facebook');
});


router.get('/', (req, res) => {
    res.render('home/index')
});

router.get('/servicos', (req, res) => {
    res.render('home/servicos')
});

router.get('/planos', (req, res) => {
    res.render('home/planos')
});

router.get('/faq', (req, res) => {
    /*let id = req.params.id
    console.log("id:" + id)*/
    // faqs.find("")
    res.render('home/faq')
})

/*router.post('/login',function (req, res) {
    req.body.email
    req.body.senha
    res.send('RECEBIDO')
})*/

module.exports = router;
