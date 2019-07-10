const express = require("express");
const router = express.Router();
// const Sequelize = require('sequelize')


// pegar models
const Plan = require("../models").Plan
const Contact = require('../models').Contact
const Users = require('../models').User

// as rotas

router.get('/', async (req, res) => {
    // res.send(lang)
    // console.log('lingua: '+lang)
    // console.log('teste')
    // res.cookie('cookeLang', 'pt', { maxAge: 900000, httpOnly: true });
    
    try {
        const ress = await Users.findAll()
        const planos = await Plan.findAll()
        const contato = await Contact.findAll()
        // console.log('dados:')
        // console.log(ress[0].firstName)
        // console.log('Planos')
        // console.log(contato[0].phone)

        return res.render('home/index', {
            User: req.user,
            Planos: planos,
            Contato: contato
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

router.get('/servicos', (req, res) => {
    res.render('home/servicos', {
        User: req.user
    })
});

router.get('/planos', async (req, res) => {
    try {

        const planos = await Plan.findAll()
        const contato = await Contact.findAll()


        res.render('home/planos', {
            User: req.user,
            Planos: planos,
            Contato: contato
        })
    } catch (error) {
        throw new Error('Erro ao pegar os dados de contactos, redes sociais, planos')
    }
});

router.get('/faq', async (req, res) => {
    try {

        res.render('home/faq', {
            User: req.user
        })
    }catch(err){
        throw new Error('Erro ao retornar dados de faq e categorias')
    }
})

router.get('/faq/:id', async (req, res) => {
    try {
        res.render('booking/teste', {
            User: req.user,
            id: req.params.id
        })
    } catch (error) {
        throw new Error('erro ao pegar o faq pelo id')
    }
})


module.exports = router;
