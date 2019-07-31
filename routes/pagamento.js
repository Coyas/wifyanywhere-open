const express = require('express')
const router = express.Router()
let   nhbs = require('nodemailer-express-handlebars')
const Mail = require('../config/mail')

// pegar models
const Pagamentos = require('../models').Payment
const Plan      = require("../models").Plan
const Contact   = require('../models').Contact
const Category  = require('../models').Category
const Faqs      = require('../models').Faq
const Rsocials  = require('../models').Rsocial
const Places    = require('../models').Place
const Bookings   = require('../models').Booking

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

router.get('/:id', authCheck, async (req, res) => {
    try {
        
        const contato   = await Contact.findAll()
        const redes     = await Rsocials.findAll()

        return res.render('booking/pagamento', {
            User: req.user,
            Contato: contato,
            Rsocial: redes,
            book: req.params.id
        })
    } catch (error) {
        throw new Error('flada no pagamento index')
    }
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

Mail.use('compile', nhbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'views/mail/partial',
      layoutsDir: 'views/mail',
      defaultLayout: 'index.handlebars',
    },
    viewPath: 'views/mail',
    extName: '.handlebars',
}))

router.post('/pagamento_visa/:id', authCheck, async (req, res) => {
    try {
        // const contato = await Contact.findAll()
        // const redes = await Rsocials.findAll()

        // pegar dados do cartao
        console.log(req.body.cardnumber)
        console.log(req.body.cardexpiry)
        console.log(req.body.cardholder)
        console.log(req.body.ccv)

        console.log('parametros: '+req.params.id)

        // pegar dados para enviar ao email
        const booking = await Bookings.findByPk(req.params.id)

        console.log(booking)


        
        return res.send('pagamento efetuado com sucesso')
    } catch (error) {
        throw new Error('erro no pagamento: '+ error.message)
    }
})

router.post('/pagamento_visas', authCheck, (req, res) => {

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