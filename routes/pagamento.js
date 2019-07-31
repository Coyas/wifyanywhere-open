const express = require('express')
const router = express.Router()
const Mail = require('../config/mail')

// pegar models
const Pagamentos = require('../models').Payment

// login session checker
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

router.get('/:id', authCheck,(req, res) => {
    res.render('booking/pagamento', {
        User: req.user
    })
})

router.get('/recarga/:id', authCheck,(req, res) => {
    res.render('booking/pagamento', {
        User: req.user,
        msg: "recaregamento"
    })
})

router.post('/visasuccess', authCheck, (req, res) => {
    res.send('pagamento efetuado')
})
 
router.post('/pagamento_visa', authCheck, (req, res) => {

    // email de confirmacao de reserva

    Mail.sendMail({
        from: '"Ailton Duarte 👻" <adidas.coyas@gmail.com>', // sender address
        to: req.user.email, // list of receivers
        subject: "Confirmacao de reserva", // Subject line
        text: "Ola acabaste de fazer uma reserva do despositivo da wifianywhere", // plain text body
        html: "Ola acabaste de fazer uma reserva do despositivo da wifianywhere" // html body
    }).then( () => {
        console.log('Envio do email de confirmacao de booking');
    })


    // email de confirmacao de pagamento

    Mail.sendMail({
        from: '"Ailton Duarte 👻" <adidas.coyas@gmail.com>', // sender address
        to: req.user.email, // list of receivers
        subject: "Confirmacao de pagamento", // Subject line
        text: "Ola acabaste de fazer uma reserva do despositivo da wifianywhere", // plain text body
        html: "Ola acabaste de fazer uma reserva do despositivo da wifianywhere" // html body
    }).then( () => {
        console.log('email enviado')
        res.redirect('/users/'+req.user.id)
    }).catch( err => {
        console.log('erro ao enviar o email: '+err)
        // res.redirect('/users/'+req.user.id)
        res.send("erro ao enviar o email: "+err)
    })


    
    
})

module.exports = router