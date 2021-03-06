const express = require('express')
const router = express.Router()
let   nhbs = require('nodemailer-express-handlebars')
const keys = require('../config/keys.json')
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
const Users   = require('../models').User

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
        const booking   = await Bookings.findAll({
            where: {id: req.params.id},
            attributes: ['id', 'pickupdate', 'numdias', 'flynumber', 'planId', 'userId', 'pickuplocationId', 'returnlocationId', 'showup'],
            include: [
                {model: Users},
                {model: Plan}
            ]
        })
        console.log(booking)

        const pickuplocationId = await Places.findAll({
            where: {id: booking[0].pickuplocationId}
        })

        
        const returnlocationId = await Places.findAll({
            where: {id: booking[0].returnlocationId}
        })

        return res.render('booking/pagamento', {
            User: req.user,
            Contato: contato,
            Rsocial: redes,
            book: req.params.id,
            booking: booking,
            pickuplocal: pickuplocationId,
            returnlocal: returnlocationId
        })
    } catch (error) {
        throw new Error('falha no pagamento index')
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
        console.log('dados do cartao')
        console.log(req.body.cardnumber)
        console.log(req.body.cardexpiry)
        console.log(req.body.cardholder)
        console.log(req.body.ccv)

        // pegar dados para enviar ao email
        // dados do booking, Users & plano
        const booking = await Bookings.findAll({
            where: {id: req.params.id},
            attributes: ['id', 'pickupdate', 'numdias', 'flynumber', 'planId', 'userId', 'pickuplocationId', 'returnlocationId', 'showup'],
            include: [
                {model: Users},
                {model: Plan}
            ]
        })
        // dados do Places
        const pickuplocationId = await Places.findAll({
            where: {id: booking[0].pickuplocationId}
        })

        const returnlocationId = await Places.findAll({
            where: {id: booking[0].returnlocationId}
        })
        console.log('pick up place')
        console.log(pickuplocationId[0].nome)
        console.log('drop off place')
        console.log(returnlocationId[0].nome)

        console.log('booking: ')
        console.log(booking)
        console.log('Planos: ')
        console.log(booking[0].Plan)
        console.log('user: ')
        console.log(booking[0].User)

        // calculo de pagamento
        const taxa      = 330  //pegar de banco de dados
        const pacote    = booking[0].Plan.preco   //pegar de banco de dados

        const reserva   = taxa * booking[0].numdias + pacote

        // guardar alguns dados de pagamento
        const a = await Pagamentos.create({
            data: new Date(),
            valor: reserva, //
            bookingId: booking[0].id,
            tipo: 0
        })
        
        console.log('dados de pagamento')
        console.log(a)


        console.log('parametros: '+req.params.id)

        // gerar o qrcode
        var qr = require("qr-image")
        var qr_svg = qr.image('http://192.168.88.42:3000', { type: 'png' })
        qr_svg.pipe(require('fs').createWriteStream('public/i_love_qr.png'))
        var svg_string = qr.imageSync('http://192.168.88.42:3000', { type: 'png' })
        console.log(svg_string)
        // enviar email
        const email = {
            from: `<${keys.email.user}>`,
            to: req.user.email, // list of receivers
            // to: 'ailton_duarte@outlook.com',
            subject: "Confirmacao de Reserva Wifianywhare", // Subject line
            text: `o seu codigo de reserva é ${booking[0].id}`, // plain text body
            // html: 'Embedded image: <img src="cid:adidas.coyas@kgmail.com"/>',
            attachments: [
                {   // file on disk as an attachment
                    filename: 'i_love_qr.png',
                    path: 'public/i_love_qr.png', // stream this file
                    cid: 'geral@wifianywhere.cv'
                },
            ],
            template: 'index',
            context: {
                qrcode: 'cid:geral@wifianywhere.cv',
                nome: booking[0].User.firstName,
                apelido: booking[0].User.lastName,
                pickupdate: booking[0].pickupdate,
                plano: booking[0].Plan.nome,
                phone: booking[0].User.phone,
                picklocation: pickuplocationId[0].nome,
                droplocation: returnlocationId[0].nome,
                preco: reserva      
            }
        }

        // opcao 2
        const sa = Mail.sendMail(email)

        if(sa){
            console.log('email enviado com sucesso')
        }else {
            console.log('falha ao enviar o email')
        }

        // return res.render('user/dash', {
        //     User: req.user,
        //     Contato: contato,
        //     Rsocial: redes, 
        //     svg: svg_string
        // })

        
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