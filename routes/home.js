const express = require("express");
const router = express.Router();
// const Sequelize = require('sequelize')
const keys = require('../config/keys.json')
let   nhbs = require('nodemailer-express-handlebars')
const Mail = require('../config/mail')


// pegar models
const Plan      = require("../models").Plan
const Contact   = require('../models').Contact
const Category  = require('../models').Category
const Faqs      = require('../models').Faq
const Rsocials  = require('../models').Rsocial

// as rotas

router.get('/', async (req, res) => {
    // res.send(lang)
    // console.log('lingua: '+lang)
    // res.cookie('cookeLang', 'pt', { maxAge: 900000, httpOnly: true });
    
    try {
        // console.log('translation: ')
        // console.log('lingua: ' + ulang)
        // console.log('cookie: ')
        // console.log(req.cookies.wifianywhere)
        
        const planos    = await Plan.findAll()
        const contato   = await Contact.findAll()
        const redes     = await Rsocials.findAll()
        // console.log('dados:')
        // console.log(ress[0].firstName)
        // console.log('Planos')
        // console.log(redes)
        // console.log(contato[0].phone) 

        return res.render('home/index', {
            User: req.user,
            Planos: planos,
            Contato: contato,
            Rsocial: redes
        })

    } catch(err) {
        throw new Error('Erro ao retornar dados de planos, contatos')
    }

    
    
    
    // result.then( d => {
    //     console.log(d)
    // })
    
    
    // console.log('dados json:')
    // console.log(res.firstName)

});

router.get('/servicos', async (req, res) => {
    try {
        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()


        return res.render('home/servicos', {
            User: req.user,
            Contato: contato,
            Rsocial: redes
        })
    } catch (error) {
        throw new Error('Erro ao pegar os dados para servicos')
    }
});

router.get('/planos', async (req, res) => {
    try {

        const planos = await Plan.findAll()
        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()


        return res.render('home/planos', {
            User: req.user,
            Planos: planos,
            Contato: contato,
            Rsocial: redes
        })
    } catch (error) {
        throw new Error('Erro ao pegar os dados de contactos, redes sociais, planos')
    }
});

//attach the plugin to the nodemailer transporter

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
router.get('/teste', async (req, res) => {

    try {

        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()

        
        var qr = require("qr-image")

        var qr_svg = qr.image('http://192.168.88.42:3000', { type: 'png' });
        // essa linha cria uma svg com qrcode na root folder  `../WifiData/${req.user.email}`/${qrcodeNome.svg}`
        qr_svg.pipe(require('fs').createWriteStream('public/i_love_qr.png'));

        var svg_string = qr.imageSync('http://192.168.88.42:3000', { type: 'png' });

        console.log(svg_string)
        

        // let send = Mail.templateSender(temp)

        // send('teste de email templete', context, callback)
        const email = {
            from: `<${keys.email.user}>`,
            to: keys.email.user, // list of receivers
            // to: 'ailton_duarte@outlook.com',
            subject: "teste com qrcoden no wifianywhere ✔", // Subject line
            text: "teste com qr code", // plain text body
            // html: 'Embedded image: <img src="cid:adidas.coyas@kgmail.com"/>',
            attachments: [
                {   // file on disk as an attachment
                    filename: 'i_love_qr.png',
                    path: 'public/i_love_qr.png', // stream this file
                    cid: 'adidas.coyas@kgmail.com'
                },
            ],
            template: 'index',
            context: {
                qrcode: 'cid:adidas.coyas@kgmail.com',
                username: 'ailton mendes duarte',
                pass: 'terrasystem aazezeaze'
            }
        }

        // opcao 2
        Mail.sendMail(email)

        return res.render('home/teste', {
            User: req.user,
            Contato: contato,
            Rsocial: redes, 
            svg: svg_string
        })
    } catch (error) {
        throw new Error("erro "+error)
    }

})


module.exports = router;
