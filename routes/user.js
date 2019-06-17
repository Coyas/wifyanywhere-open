const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('Pagina para perfil de usuarios - perfil')
})

router.get('/config', (req, res) => {
    res.render('Pagina para perfil de usuarios - configuracoes')
})

module.exports = router