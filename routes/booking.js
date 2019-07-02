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

    // variaveis
    // let req.body.pdate = null //pickupdate
    // let req.body.numdays = null //numero de dias com wifi
    // let req.body.plocation = null //pick up location
    // let req.body.rlocation = null //return location
    // let req.body.flynum = null  //numero de voo
    // let req.body.title = null  //titulo Mr. Ms.
    // let req.body.fname = null  //first name
    // let req.body.lname = null  //last name
    // let req.body.saddr = null  //street address
    // let req.body.baddr = null  // biling address
    // let req.body.city  = null  //cidade
    // let req.body.zip   = null  // codigo zip
    // let req.body.phone = null  // phone kkkkk
    // let req.body.country = null // pais
    // let req.body.email = null  // email

    console.log('dados pegos do booking')
    console.log(req.body.pdate)
    console.log(req.body.numdays)
    console.log(req.body.plocation)
    console.log(req.body.rlocation)
    console.log(req.body.flynum)
    console.log(req.body.title)
    console.log(req.body.fname)
    console.log(req.body.saddr)
    console.log(req.body.baddr)
    console.log(req.body.city)
    console.log(req.body.zip)
    console.log(req.body.country)
    console.log(req.body.email)

    
    res.redirect('/pagamento')
})

// implementar a requisicao de post de form para SISP (visa's card)


module.exports = router;