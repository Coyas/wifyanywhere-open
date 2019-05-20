const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home/index')
})

router.get('/admin', (req, res) => {
    res.send('rotas do adminitrador')
})

module.exports = router