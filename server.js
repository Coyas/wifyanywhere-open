
const Mail = require('config/Mail')
var qr = require("qr-image")

var qr_svg = qr.image('I love QR!', { type: 'svg' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));

var svg_string = qr.imageSync('I love QR!', { type: 'svg' });

Mail.sendMail({
    from: `<${keys.email.user}>`,
    to: email, // list of receivers
    // to: 'ailton_duarte@outlook.com',
    subject: "teste de qrcode in svg no wifianywhere ✔", // Subject line
    text: "vai para o site "+ Url +"", // plain text body
    html: `
        
        `//, // html body
    // attachments: [
    //     {
    //         filename: "Beneficios 1.svg", 
    //         path: '../public/images/Beneficios 1.svg',
    //         cid: 'geral@wifianywhere.com'
    //     }
    // ]
})
  