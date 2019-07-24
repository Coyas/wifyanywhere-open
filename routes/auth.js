const router = require('express').Router()
const passport = require('passport')
const User = require('../models').User
const bcrypt = require('bcrypt');
const Mail = require('../config/mail')
const keys = require('../config/keys.json')
let randomstring = require("randomstring")
const saltRounds = 10

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

/******************** Facebook Login **************************/
//auth with facebook
router.get('/facebook', passport.authenticate('facebook'));
// router.get('/facebook', passport.authenticate('facebook',
//     {
//       scope: ['displayName', 'name', 'gender', 'photos']
//     }
// ));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`/users/${req.user.id}`)
});

/********************Google Login *****************************/
//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] //separa informacao por virgulas ['profile', 'email']
}))
// router.get('/google', (req, res) => {
//     res.send('login com google')
// })

//callback de redirecionamento do google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

    // res.send('user logado foi: '+req.user.googleId)
    res.redirect(`/users/${req.user.id}`)
})

/************* Local Login ************************************/
router.get('/logout', authCheck, (req, res) => {
    console.log('logout com sucesso');
    req.logout();
    req.session.destroy();//limpar a sessao do banco de dados
    res.redirect('/');// e sera redirecionado para index sem sessao
});

router.post('/login', passport.authenticate('local', {//add condicoes de acesso
    successRedirect: '/',
    failureRedirect: '/'
}))

router.post('/registro', (req, res) => {
    // tested e logs
    console.log('Nome: '+req.body.firstName)
    console.log('Apelido: '+req.body.lastName)
    console.log('email: '+req.body.email)
    console.log('password: '+req.body.password)
    console.log('repeat pass: '+req.body.repass)


    // validacao com espress-validator

    // req.checkBody('firstName', 'O firstName nao pode estar vazia, porfavor tenta de novo').isEmpty();
    // req.checkBody('lastName', 'O lastName nao pode estar vazia, porfavor tenta de novo').isEmpty();
    req.checkBody('email', 'O email nao pode estar vazia, por favor tenta de novo').isEmail();
    req.checkBody('email', 'O email deve estar entre 4-100 caracteres, porfavor tenta de novo').len(4, 100);
    req.checkBody('password', 'password deve estar entre 8-100 caracteres.').len(8,100);
    // // req.checkBody('pass', 'password deve conter pelo menos um caracter maiuscula, uma minuscula, um numero e um caracter especial').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(,=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('repass', 'confirmar password deve estar entre 8-100 caracteres.').len(8,100);
    req.checkBody('repass', 'As senha parecem estar diferentes, tenta de novo.').equals(req.body.password);


    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors: ${JSON.stringify(errors)}`);
      res.render('/', {
          errors: errors,
          title: 'Erros ao registrar utilizador'
      });
    }else {

        User.findOne({
            where: {
            email: req.body.email,
            }
        }).then( user => {
            console.log(`Terra user: ${JSON.stringify(user)}`)

            if( user ){
                
                // res.send('Utilizador ja existe')
                res.render('error',{
                    title: "Utilizador ja existe"
                })
            }else {
                // res.send('utilizador nao existe, criando...')
                // criptografando a senha a
                console.log('registrando user')
                const password = req.body.password
                bcrypt.hash(password, saltRounds, (err, hash) => {

                    // create user
                    User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        status: 10,
                        access: 1,
                        localId: true
                    }).then( user => {
                        console.log('cadastro feito com sucesso<br>**** dados do cadastro ***<br><br>username: '+req.body.username+'<br>email: '+req.body.email+'<br>password: '+req.body.password+'<br>password criptografado: '+hash)
                        req.login(user, (err) => {

                            console.log('login done com sucesso no registrar');

                            // get accessToken
                            const Url = `http://${keys.server.server}:${keys.server.port}/auth/emailcheck/${req.user.accessToken}`
                            // console.log(Url)

                            Mail.sendMail({
                                from: `<${keys.email.user}>`,
                                to: req.user.email, // list of receivers
                                subject: "Confirmacao de conta no wifianywhere ✔", // Subject line
                                text: "Ola Mundo, estou testando o email enviado por nodejs com pacote nodemailer, viva mundo node", // plain text body
                                html: `Confirme seu email <a href="${Url}" class="btn btn-primary">Confirmar</a>` // html body
                            }).then( () => {
                                console.log('email enviado')
                                res.redirect('/users/'+req.user.id)
                            }).catch( err => {
                                console.log('erro ao enviar o email: '+err)
                                // res.redirect('/users/'+req.user.id)
                                res.send("erro ao enviar o email: "+err)
                            })

                            // res.redirect('/users/'+req.user.id);

                        });
                    }).catch((err) => {
                        console.log('erro ao cadastrar o user: '+err)
                    })
                //  res.send('*********** dados do cadastro ********************** <br><br>username: '+req.body.username+'<br>email: '+req.body.email+'<br>password: '+req.body.password+'<br>password criptografado: ')
                })
            }

        })
    }
})


// rota de comfirmar email
router.get('/emailcheck/:accessToken', (req, res) => {

    User.findOne({ where: {accessToken: req.params.accessToken} }).then(user => {

        console.log("user: "+user)

        if(user){
            User.update({
                accessToken: null,
                confirme: true
            }, {
                where: {
                    accessToken: req.params.accessToken
                }
            })
            .then( () => {
                console.log("atualizacao de user feito com sucesso")
                res.redirect('/')
            }).catch( err => {
                console.log("Falha na atualizacao de user feito com sucesso")
                res.redirect('/undefined')
            })
        }else{
            res.redirect('/undefined')
        }
    }).catch( err => {
        res.redirect('/undefined')
    }) 


})
 
router.get('/resetSenha', (req, res) => {
    res.render('home/resetsenha', {layout: 'resetsenha'})
})

router.post('/resetSenha', async (req, res) => {
    // res.send('email de reset de senha enviado')
    try {
        const email = req.body.email
        console.log('email: ')
        console.log(email)
        
        // verifica se o email existe
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        console.log('user: ')
        console.log(user)

        // verificar se é o localLogin (0 loginlocal - 1 login com redes sociais)
        if(user['localId'] == 0){
            console.log('voce fez login com uma rede social, por isso nao pode mudar a senha aqui, use a rede social para mudar a senha')
        }else {
        // gerar randomicamente uma senha
            const senha = randomstring.generate(10);
            console.log('senha gerada: ')
            console.log(senha)
            // const senha = 'terrasystem123'

        // atualizar a senha criptograda
            bcrypt.hash(senha, saltRounds, function(err, hash) {
                User.update({
                    password: hash
                }, {
                    where: {
                        email: email
                    }
                })
                .then( data => {
                    // console.log('password atualizado com sucesso')
                    // console.log(data)

                            // enviar a senha pelo email
                    // const Url = `http://${keys.server.server}`
                    const Url = `http://192.168.1.67:3000`
                    // console.log('emailllll:'+req.body.email )

                    Mail.sendMail({
                        from: `<${keys.email.user}>`,
                        to: email, // list of receivers
                        // to: 'ailton_duarte@outlook.com',
                        subject: "Pedido de Reset Senha no wifianywhere ✔", // Subject line
                        text: "Confirme seu email "+ Url +" Confirmar", // plain text body
                        html: `
                            <p>
                                Sua nova senha do portal wifianywhere é: ${senha}<br>
                                Fique livre de mudar essa senha quando quiser
                            </p>

                            <p>
                            Confirme seu email <a href="${Url}" class="btn btn-primary">Confirmar</a>
                            </p>
                            `//, // html body
                        // attachments: [
                        //     {
                        //         filename: "Beneficios 1.svg", 
                        //         path: '../public/images/Beneficios 1.svg',
                        //         cid: 'geral@wifianywhere.com'
                        //     }
                        // ]
                    })

                    
                    return res.redirect('/')
                }).catch(err => {
                    console.log('erro na atualizacao da senha:' + err)
                })
            });

            

        }//fim do else de verificar localLogin

        // // enviar a senha pelo email
        // // const Url = `http://${keys.server.server}`
        // const Url = `http://192.168.1.67:3000`
        // // console.log('emailllll:'+req.body.email )

        // const mail = await Mail.sendMail({
        //     from: `<${keys.email.user}>`,
        //     to: email, // list of receivers
        //     // to: 'ailton_duarte@outlook.com',
        //     subject: "Pedido de Reset Senha no wifianywhere ✔", // Subject line
        //     text: "Confirme seu email "+ Url +" Confirmar", // plain text body
        //     html: `
        //         <p>
        //             Sua nova senha do portal wifianywhere é: ${senha}
        //         </p>
        //         <p>
        //         Confirme seu email <a href="${Url}" class="btn btn-primary">Confirmar</a>
        //         </p>
        //         `//, // html body
        //     // attachments: [
        //     //     {
        //     //         filename: "Beneficios 1.svg", 
        //     //         path: '../public/images/Beneficios 1.svg',
        //     //         cid: 'geral@wifianywhere.com'
        //     //     }
        //     // ]
        // })

       

        // if(mail){
        //     console.log('email de resetSenha enviado')
        //     // return res.redirect('/')
        // }else {
        //     console.log('erro ao enviar o email de resetSenha')
        //     // return res.redirect('/')
        // }

       

        

    } catch (error) {
        throw new Error('erro no post do reset senha')
    }
    
})



module.exports = router