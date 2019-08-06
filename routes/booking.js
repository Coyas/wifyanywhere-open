const express = require("express");
const router = express.Router();
const User = require('../models').User


// pegar models
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
        res.redirect('/login')
    }else{
        // se esta logado
        next() //continue
    } 
}



router.get('/', authCheck, async (req, res, next) => {
    try {
        const planos    = await Plan.findAll()
        const contato   = await Contact.findAll()
        const redes     = await Rsocials.findAll()
        const places    = await Places.findAll()

        return res.render('booking/booking', {
            User: req.user,
            Planos: planos,
            Contato: contato,
            Rsocial: redes,
            Place: places
        })

    } catch (error) {
        throw new Error('erro ao pegar a rota booking')
    }

});


// inplementar a requisicao post dos form de dados
router.post('/orders', authCheck, (req, res) => {

    // variaveis
    // let req.body.pdate = null //pickupdate
    // let req.body.numdays = null //numero de dias com wifi
    // let req.body.plocation = null //pick up location
    // let req.body.rlocation = null //return location
    // let req.body.flynum = null  //numero de voo
    // let req.body.title = null  //titulo Mr. Ms.
    // let req.body.fname = null  //first name
    // let req.body.lname = null  //last name
    // let req.body.saddr = null  //street address
    // let req.body.baddr = null  // biling address
    // let req.body.city  = null  //cidade
    // let req.body.zip   = null  // codigo zip
    // let req.body.phone = null  // phone kkkkk
    // let req.body.country = null // pais
    // let req.body.email = null  // email

    console.log('dados pegos do booking')
    console.log(req.body.pdate)
    console.log(req.body.numdays)
    console.log(req.body.plocation)
    console.log(req.body.rlocation)
    console.log(req.body.flynum)
    console.log(req.body.title)
    console.log(req.body.fname)
    console.log(req.body.lname)
    console.log(req.body.saddr)
    console.log(req.body.baddr)
    console.log(req.body.city)
    console.log(req.body.zip)
    console.log(req.body.country)
    console.log(req.body.phone)
    console.log(req.body.email)
    console.log('plano: ')
    console.log(req.body.plano)
    console.log('planotipo')
    console.log(req.body.planotipo)
    console.log('iniciando o update dos dados de user id=>'+req.user.id)

    
    
    User.update({
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        street_adress: req.body.saddr,
        biling_adress: req.body.baddr,
        city: req.body.city,
        zip_code: req.body.zip,
        phone: req.body.phone
    }, {
        where: {
            id: req.user.id
        }
    }).then( () => {
        console.log("atualizacao de user feito com sucesso")
        // create user
        Bookings.create({
            pickupdate: req.body.pdate,
            numdias: req.body.numdays,
            flynumber: req.body.flynum,
            planId: 1,
            userId: req.user.id,
            pickuplocationId: req.body.plocation,
            returnlocationId: req.body.rlocation,
            show: false,
        }).then( book => {
            console.log('booking feito com sucesso: ')
            console.log(book.id)
            res.redirect('/pagamento/'+book.id)
        }).catch( err => {
            console.log('erro em booking: '+err)
        })
        
    }).catch( err => {
        console.log("Falha na atualizacao de user feito com sucesso:"+err)
        res.redirect('/undefined')
    })    
})

// implementar a requisicao de post de form para SISP (visa's card)


module.exports = router;