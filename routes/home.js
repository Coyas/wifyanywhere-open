const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home/index')
})

router.get('/servicos', (req, res) => {
    res.render('home/servicos')
})

router.get('/planos', (req, res) => {
    res.render('home/planos')
})

router.get('/faq', (req, res) => {
    res.render('home/faq')
})

module.exports = router