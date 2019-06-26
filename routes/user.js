const express = require("express")
const router = express.Router()

const User = require("../models/User")

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
 


router.get('/:user', authCheck, (req, res) => {
    // console.log(`nome: ${req.user.firstName} apelido: ${req.user.lastName}`)

    User.findByPk(req.params.user).then( user => {
        if(req.params.user == req.user.id){
            res.render('user/dash', {
                User: user
            })
        }else {
            res.render('error', {
                User: user
            })
        }
    }).catch( err => {
        res.render('error',{
            User: req.user
        })
    })

    
})

router.get('/config', authCheck, (req, res) => {
    // res.send('Pagina para perfil de usuarios - configuracoes')
    res.render('user/editar',{User:req.user})
})
router.post('/config', authCheck, (req, res) => {


      // Change everyone without a last name to "Doe"
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, // ca sta fixe
        phone: req.body.phone,
        street_adress: req.body.street_adress,
        biling_adress: req.body.biling_adress,
        city: req.body.city,
        zip_code: req.body.zip_code,
        country: req.body.country
    }, {
        where: {
        id: req.user.id
        }
    }).then( () => {
        console.log("atualizacao de user feito com sucesso")
        res.redirect('/users')
    }).catch( err => {
        console.log("Falha na atualizacao de user feito com sucesso")
        res.redirect('/user/config')
    })     
})

module.exports = router