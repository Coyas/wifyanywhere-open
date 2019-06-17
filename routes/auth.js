const router = require('express').Router()
const passport = require('passport')

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

// router.get('/login', (req, res) => {
//     res.render('dash/login')
// })

router.get('/logout', authCheck, (req, res) => {
    console.log('logout com sucesso');
    req.logout();
    req.session.destroy();//limpar a sessao do banco de dados
    res.redirect('/');// e sera redirecionado para index sem sessao
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/dash' 
}))

router.post('/registro', authCheck, (req, res) => {
    // tested e logs
    
    console.log('email: '+req.body.email)
    console.log('password: '+req.body.password)


    // validacao com espress-validator
    
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
        const password = req.body.password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            // create user
            User.create({
                email: req.body.email,
                password: hash
            }).then( user => {
                console.log('cadastro feito com sucesso<br>*********** dados do cadastro **********************<br><br>username: '+req.body.username+'<br>email: '+req.body.email+'<br>password: '+req.body.password+'<br>password criptografado: '+hash)
                req.login(user, (err) => {
                    console.log('login done com sucesso no registrar');
                    res.redirect('/dash');
                });
            }).catch((err) => {
                console.log('erro ao cadastrar o user: '+err)
            })

            //  res.send('*********** dados do cadastro **********************<br><br>username: '+req.body.username+'<br>email: '+req.body.email+'<br>password: '+req.body.password+'<br>password criptografado: ')
        })
    }
})


module.exports = router