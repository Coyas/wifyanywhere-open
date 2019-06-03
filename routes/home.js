const express = require("express");
const faqs = require("../models/faqs.js")
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home/index')
});

router.get('/servicos', (req, res) => {
    res.render('home/servicos')
});

router.get('/planos', (req, res) => {
    res.render('home/planos')
});

router.get('/faq/:id', (req, res) => {
    /*let id = req.params.id
    console.log("id:" + id)*/
    faqs.find("")
    res.render('home/faq')
})

module.exports = router;
