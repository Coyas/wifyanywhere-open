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

        const categorias = await Category.findAll()

        const faqs = await Faqs.findAll({
            where: {
                categoryId: 1
            }
        })
        
        // console.log(categorias)
        console.log(categorias[1])
        
        return res.render('home/faq', {
            User: req.user,
            Contato: contato,
            Rsocial: redes,
            Catego: categorias,
            Faq: faqs
        })

    }catch(err){
        throw new Error('Erro ao retornar dados de faq e categorias')
    }
})

router.get('/:id', async (req, res) => {

    try {
        // const faqs = await Faqs.findAll()

        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()

        const categorias = await Category.findAll()

        const faqs = await Faqs.findAll({
            where: {
                categoryId: req.params.id
            }
        })

        // console.log(faqs)

        return res.render('home/faq', {
            User: req.user,
            Contato: contato,
            Rsocial: redes,
            Catego: categorias,
            Faq: faqs
        })

        // res.send('dados da categoria '+req.params.id+': '+faqs)
        
    } catch (error) {
        throw new Error('Erro ao retornar dados de faqs atraves de uma categoria')
    }
})

router.post('/pesquisa', async (req, res) => {

    try {
        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()

        const categorias = await Category.findAll()

        const faqs = await Faqs.findAll({
            where: {
                title: req.body.search
            }
        })

        // console.log(faqs)

        return res.render('home/faq', {
            User: req.user,
            Contato: contato,
            Rsocial: redes,
            Catego: categorias,
            Faq: faqs
        })

    } catch (error) {
        throw new Error('Erro ao pesquisar pelos faqs')
    }

})



module.exports = router
