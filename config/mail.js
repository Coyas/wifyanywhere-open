"use strict";
const nodemailer = require("nodemailer");
const keys = require('./keys.json')

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: keys.email.smtp, // Gmail Host
        port: keys.email.porta, // Port
        secure: keys.email.seguro, // this is true as port is 465
        auth: {
            user: keys.email.user, //Gmail username
            pass: keys.email.pass // Gmail password
        }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ana Bela Semedo 👻" <anabelasemedo5@gmail.com>', // sender address
    to: "geralinnovatmedia@gmail.com", // list of receivers
    subject: "Ola teste do nodemailer ✔", // Subject line
    text: "Ola Mundo, estou testando o email enviado por nodejs com pacote nodemailer, viva mundo node", // plain text body
    html: "<b>Ola Mundo, estou testando o email enviado por nodejs com pacote nodemailer, viva mundo <a href=\"nodejs.org\">node</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

// module.exports = main


// nodemailer.createTestAccount((err, account) => {
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.googlemail.com', // Gmail Host
//         port: 465, // Port
//         secure: true, // this is true as port is 465
//         auth: {
//             user: 'GMAIL_USERNAME', //Gmail username
//             pass: 'GMAIL_PASSWORD' // Gmail password
//         }
//     });

//     let mailOptions = {
//         from: '"Artisans Web" <admin@artisansweb.net>',
//         to: 'RECEPIENT_EMAIL_ADDRESS', // Recepient email address. Multiple emails can send separated by commas
//         subject: 'Welcome Email',
//         text: 'This is the email sent through Gmail SMTP Server.'
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//     });
// });