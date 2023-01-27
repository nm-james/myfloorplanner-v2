const nodemailer = require('nodemailer');
const currentEmail = 'seafordrsl.reservations@gmail.com'
//SeafordRSL2000
const password = 'bvihjdfygxkhhmle'
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: currentEmail,
      pass: password
    }
});

module.exports = { sender: transporter, email: currentEmail }