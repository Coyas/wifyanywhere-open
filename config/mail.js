"use strict";
const nodemailer = require("nodemailer");
const keys = require('./keys.json')

// async..await is not allowed in global scope, must use a wrapper
//  function main(user){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount =  nodemailer.createTestAccount();

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

  // let info =  transporter.sendMail({
  //   from: '"Ailton Duarte 👻" <adidas.coyas@gmail.com>', // sender address
  //   to: "anabela556@hotmail.com", // list of receivers
  //   subject: "Ola teste do nodemailer ✔", // Subject line
  //   text: "Ola Mundo, estou testando o email enviado por nodejs com pacote nodemailer, viva mundo node", // plain text body
  //   html: "<b>Ola Mundo, estou testando o email enviado por nodejs com pacote nodemailer, viva mundo <a href=\"nodejs.org\">node</b>" // html body
  // });

  // console.log("Message sent: %s", info.messageId);
  // console.log("Message sent");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main()

module.exports = transporter
