const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('booking/pagamento')
})
 
router.post('/pagamento_visa', (req, res) => {
    // res.send('pagamento efetuado')
    res.redirect('/users')
})

module.exports = router