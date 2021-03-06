const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10


// pegar models
const User = require("../models").User
const Contact   = require('../models').Contact
const Rsocials  = require('../models').Rsocial

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



router.get('/:user', authCheck, async (req, res) => {
    
    try {
        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()

        if(req.params.user == req.user.id){
            return res.render('user/dash', {
                User: req.user,
                Contato: contato,
                Rsocial: redes
            })
        }else {
            return res.render('error', {
                User: req.user
            })
        }

        
    } catch (error) {
        throw new Error('Error no perfil do user:'+error)
    }

})

router.get('/:user/config', authCheck, async (req, res) => {
    
    try {
        const contato = await Contact.findAll()
        const redes = await Rsocials.findAll()

        if(req.params.user == req.user.id){
            res.render('user/editar', {
                User: req.user,
                Contato: contato,
                Rsocial: redes
            })
        }else {
            res.render('error', {
                User: req.user
            })
        }
    } catch (error) {
        throw new Error('error nas configuraçoes de user')
    }

})




// methods posts

router.post('/config', authCheck, (req, res) => {

    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, // ca sta fixe
        phone: req.body.phone,
        street_adress: req.body.street_adress,
        biling_adress: req.body.biling_adress,
        city: req.body.city,
        zip_code: req.body.zip_code,
        country: req.body.country
    }, {
        where: {
        id: req.user.id
        }
    }).then( () => {
        console.log("atualizacao de user feito com sucesso")
        res.redirect('/users/'+req.user.id)
    }).catch( err => {
        console.log("Falha na atualizacao de user feito com sucesso")
        console.log(err)
        res.redirect('/user/'+req.user.id+'/config')
    })

})

// mudar a senha se o user tem uma conta local
router.post('/changepass', authCheck, (req, res) => {


    // req.checkBody('oldpass', 'old password nao pode estar vazia').isEmpty();
    req.checkBody('pass', 'password deve estar entre 8-100 caracteres.').len(8,100);
    // // req.checkBody('pass', 'password deve conter pelo menos um caracter maiuscula, uma minuscula, um numero e um caracter especial').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(,=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('repass', 'confirmar password deve estar entre 8-100 caracteres.').len(8,100);
    req.checkBody('repass', 'As senha parecem estar diferentes, tenta de novo.').equals(req.body.pass);


    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors de change password: ${JSON.stringify(errors)}`);
      res.redirect(`/users/${req.user.id}`)
    //   res.render('/', {
    //       errors: errors,
    //       title: 'Erros ao registrar utilizador'
    //   });
    }else {
        console.log('sem erros');
        if (bcrypt.compareSync(req.body.oldpass, req.user.password)) {

            bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
                
                User.update({
                    password: hash
                }, {
                    where: {
                    id: req.user.id
                    }
                }).then( () => {
                    console.log("atualizacao de user feito com sucesso")
                    res.redirect('/users/'+req.user.id)
                }).catch( err => {
                    console.log("Falha na atualizacao de user feito com sucesso")
                    res.redirect('/user/'+req.user.id+'/config')
                })
            })
    
            // res.send(`chage passpord<br> old: ${req.body.oldpass}<br>pass: ${req.body.pass}<br>repass: ${req.body.repass}`)
        }else {
            res.redirect(`/users/${req.user.id}`)
            // res.send(`Passpords Diferentes<br> old: ${req.body.oldpass}<br>pass: ${req.body.pass}<br>repass: ${req.body.repass}<br>user:${req.user.password}`)
        }   
    } 
})

module.exports = router

