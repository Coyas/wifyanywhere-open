const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('booking/booking');
});


// inplementar a requisicao post dos form de dados
// router.post();

// implementar a requisicao de post de form para SISP (visa's card)


module.exports = router;