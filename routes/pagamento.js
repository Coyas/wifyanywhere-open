const express = require('express')
const router = express.Router()
const Mail = require('../config/mail')

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

router.get('/', authCheck,(req, res) => {
    res.render('booking/pagamento', {
        User: req.user
    })
})

router.get('/:id', authCheck,(req, res) => {
    res.render('booking/pagamento', {
        User: req.user,
        msg: "recaregamento"
    })
})

router.post('/visasuccess', authCheck, (req, res) => {
    res.send('pagamento efetuado')
})
 
router.post('/pagamento_visa', authCheck, (req, res) => {
    // res.send('pagamento efetuado')

    Mail.sendMail({
        from: '"Ailton Duarte 👻" <adidas.coyas@gmail.com>', // sender address
        to: req.user.email, // list of receivers
        subject: "Ola teste do nodemailer ✔", // Subject line
        text: "Ola Mundo, estou testando o email enviado por nodejs com pacote nodemailer, viva mundo node", // plain text body
        html: "" // html body
    }).then( () => {
        console.log('email enviado')
        res.redirect('/users/'+req.user.id)
    }).catch( err => {
        console.log('erro ao enviar o email: '+err)
        // res.redirect('/users/'+req.user.id)
        res.send("erro ao enviar o email: "+err)
    })

    
    
})

module.exports = router