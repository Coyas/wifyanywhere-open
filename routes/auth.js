const router = require('express').Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    res.redirect('/users');
}); 

/********************Google Login *****************************/
//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'] //separa informacao por virgulas ['profile', 'email']
})) 
// router.get('/google', (req, res) => {
//     res.send('login com google')
// })

//callback de redirecionamento do google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
    // res.send('user logado foi: '+req.user.googleId)
    res.redirect('/users/')
})

/************* Local Login ************************************/
router.get('/logout', authCheck, (req, res) => {
    console.log('logout com sucesso');
    req.logout();
    req.session.destroy();//limpar a sessao do banco de dados
    res.redirect('/');// e sera redirecionado para index sem sessao
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
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
    req.checkBody('email', 'O email nao pode estar vazia, porfavor tenta de novo').isEmail();
    req.checkBody('email', 'O email deve estar entre 4-100 caracteres, porfavor tenta de novo').len(4, 100);
    // req.checkBody('password', 'password deve estar entre 8-100 caracteres.').len(8,100);
    // // req.checkBody('pass', 'password deve conter pelo menos um caracter maiuscula, uma minuscula, um numero e um caracter especial').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(,=.*[^a-zA-Z0-9]).{8,}$/, "i");
    // req.checkBody('repass', 'confirmar password deve estar entre 8-100 caracteres.').len(8,100);
    req.checkBody('repass', 'As senha parecem estar diferentes, tenta de novo.').equals(req.body.password);


    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors: ${JSON.stringify(errors)}`);
      res.render('/', {
          errors: errors,
          title: 'Erros ao registrar utilizador'
      });
    }else {
        // criptografando a senha
        console.log('registrando user')
        const password = req.body.password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            // create user
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            }).then( user => {
                console.log('cadastro feito com sucesso<br>**** dados do cadastro ***<br><br>username: '+req.body.username+'<br>email: '+req.body.email+'<br>password: '+req.body.password+'<br>password criptografado: '+hash)
                req.login(user, (err) => {
                    console.log('login done com sucesso no registrar');
                    res.redirect('/users');
                });
            }).catch((err) => {
                console.log('erro ao cadastrar o user: '+err)
            })

            //  res.send('*********** dados do cadastro **********************<br><br>username: '+req.body.username+'<br>email: '+req.body.email+'<br>password: '+req.body.password+'<br>password criptografado: ')
        })
    }
})


module.exports = router