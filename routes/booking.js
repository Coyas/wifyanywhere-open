const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('booking/booking', {
        User: req.user
    });
});


// inplementar a requisicao post dos form de dados
router.post('/orders', (req, res) => {
    // let title = req.body.
    // let title = "terra system";
    // console.log('hora de pagamento: '+req.body.email)
    // res.send('hora do pagamento')
    res.redirect('/pagamento')
})

// implementar a requisicao de post de form para SISP (visa's card)


module.exports = router;