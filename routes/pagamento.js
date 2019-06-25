const express = require('express')
const router = express.Router()
const Mail = require('../config/mail')

router.get('/', (req, res) => {
    res.render('booking/pagamento', {
        User: req.user
    })
})

router.post('/visasuccess', (req, res) => {
    res.send('pagamento efetuado')
})
 
router.post('/pagamento_visa', (req, res) => {
    // res.send('pagamento efetuado')
    Mail.main(req.user.email)
    res.redirect('/users')
})

module.exports = router