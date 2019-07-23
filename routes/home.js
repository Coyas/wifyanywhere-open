const express = require("express");
const router = express.Router();
// const Sequelize = require('sequelize')


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


module.exports = router;
