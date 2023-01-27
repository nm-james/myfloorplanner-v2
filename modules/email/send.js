let transporter = require('./init')
const sender = transporter.sender
const email = transporter.email

let mailSettings = {}
mailSettings.from = email

function sendEmail( outgoingEmail, subject, text ) {
    mailSettings.to = outgoingEmail
    mailSettings.subject = subject
    mailSettings.html = text

    sender.sendMail(mailSettings, (err, info) => {
        if (err) console.log(err);
    })
}

function sendMultipleEmails( idList ) {
    for (x in idList) {
        // let data = 
    }
}

module.exports = {
    singleEmail: sendEmail,
    multiEmail: sendMultipleEmails,
    email: email
}