const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require("../models/User")

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



router.get('/:user', authCheck, (req, res) => {
    // console.log(`nome: ${req.user.firstName}  b apelido: ${req.user.lastName}`)

    User.findByPk(req.params.user).then( user => {
        if(req.params.user == req.user.id){
            res.render('user/dash', {
                User: user
            })
        }else {
            res.render('error', {
                User: user
            })
        }
    }).catch( err => {
        res.render('error',{
            User: req.user
        })
    })


})

router.get('/:user/config', authCheck, (req, res) => {
    // res.send('Pagina para perfil de usuarios - configuracoes')
    User.findByPk(req.params.user).then( user => {
        if(req.params.user == req.user.id){
            res.render('user/editar', {
                User: user
            })
        }else {
            res.render('error', {
                User: user
            })
        }
    }).catch( err => {
        res.render('error',{
            User: req.user
        })
    })

})
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

