const nodemailer = require('nodemailer')
const creds = require()

let transporter = nodemailer.createTransport({
    host: keys.email.smtp, // Gmail Host
        port: keys.email.porta, // Port
        secure: keys.email.seguro, // this is true as port is 465
        auth: {
            user: keys.email.user, //Gmail username
            pass: keys.email.pass // Gmail password
        }
  })

  