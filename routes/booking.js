const express = require("express");
const router = express.Router();

// login session checker
const authCheck = (req, res, next) => {
    if(!req.user){
        //se user nao esta logado
        // console.log(` o middlewhere para sessao (req.session.passport.user): ${JSON.stringify(req.session.passport)}`);
        res.redirect('/login')
    }else{
        // se esta logado
        next() //continue
    }
}



router.get('/', authCheck, (req, res, next) => {
    res.render('booking/booking', {
        User: req.user
    });
});


// inplementar a requisicao post dos form de dados
router.post('/orders', authCheck, (req, res) => {
    // let title = req.body.
    // let title = "terra system";
    // console.log('hora de pagamento: '+req.body.email)
    // res.send('hora do pagamento')
    res.redirect('/pagamento')
})

// implementar a requisicao de post de form para SISP (visa's card)


module.exports = router;