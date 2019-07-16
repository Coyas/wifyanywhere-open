const express = require("express");
const router = express.Router();
// const Sequelize = require('sequelize')


// pegar models
const Plan      = require("../models").Plan
const Contact   = require('../models').Contact
const Users     = require('../models').User
const Category  = require('../models').Category
const Faqs       = require('../models').Faq

// as rotas

router.get('/', async (req, res) => {
    // res.send(lang)
    // console.log('lingua: '+lang)
    // res.cookie('cookeLang', 'pt', { maxAge: 900000, httpOnly: true });
    
    try {
        console.log('translation: ')
        console.log(req.cookies.language)
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

router.get('/servicos', async (req, res) => {
    try {
        const contato = await Contact.findAll()


        return res.render('home/servicos', {
            User: req.user,
            Contato: contato
        })
    } catch (error) {
        throw new Error('Erro ao pegar os dados para servicos')
    }
});

router.get('/planos', async (req, res) => {
    try {

        const planos = await Plan.findAll()
        const contato = await Contact.findAll()


        return res.render('home/planos', {
            User: req.user,
            Planos: planos,
            Contato: contato
        })
    } catch (error) {
        throw new Error('Erro ao pegar os dados de contactos, redes sociais, planos')
    }
});

router.get('/faq', async (req, res) => {

    // var cookies = req.headers.cookie
    
    try {
        const contato = await Contact.findAll()
        const categorias = await Category.findAll({
            include: [{
                model: Faqs
            }]
        })
        
        // console.log(categorias)
        console.log(categorias[1])
        

        return res.render('home/faq', {
            User: req.user, 
            Faq: categorias,
            Contato: contato
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
