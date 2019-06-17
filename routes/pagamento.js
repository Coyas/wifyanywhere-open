const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('booking/pagamento', {
        User: req.user
    })
})
 
router.post('/pagamento_visa', (req, res) => {
    // res.send('pagamento efetuado')
    res.redirect('/users', {
        User: req.user
    })
})

module.exports = router