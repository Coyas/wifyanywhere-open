const express = require("express")
const router = express.Router()

const authCheck = (req, res, next) => {
    if(!req.user){
        //se user nao esta logado
        // console.log(` o middlewhere para sessao (req.session.passport.user): ${JSON.stringify(req.session.passport)}`);
        res.redirect('/')
    }else{
        // se esta logado
        next() //continue
    }
}

router.get('/', authCheck, (req, res) => {
    // console.log(`nome: ${req.user.firstName} apelido: ${req.user.lastName}`)
    res.render('user/dash', {
        User: req.user
    })
})

router.get('/config', authCheck, (req, res) => {
    res.send('Pagina para perfil de usuarios - configuracoes')

})

module.exports = router