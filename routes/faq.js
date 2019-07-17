const express = require("express");
const router = express.Router();
// const Sequelize = require('sequelize')


// pegar models
const Contact   = require('../models').Contact
const Category  = require('../models').Category
const Faqs      = require('../models').Faq
const Rsocials  = require('../models').Rsocial

// as rotas

router.get('/', async (req, res) => {

    // var cookies = req.headers.cookie
    
    try {
        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()

        const categorias = await Category.findAll({
            include: [{
                model: Faqs
            }]
        })
        
        // console.log(categorias)
        // console.log(categorias[1])
        
        return res.render('home/faq', {
            User: req.user, 
            Faq: categorias,
            Contato: contato,
            Rsocial: redes
        })

    }catch(err){
        throw new Error('Erro ao retornar dados de faq e categorias')
    }
})

router.post('/pesquisa', (req, res) => {
    res.send('terrasystem 1: '+req.body.search)
})



module.exports = router
