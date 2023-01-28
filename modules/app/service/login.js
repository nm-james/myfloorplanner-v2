const express = require('express');
const app = express.Router();
const passport = require('../other/passport')
const reverseValidate = passport.reverseValidateservice
const checkPassword = passport.authenticateservice

app.get('/login', reverseValidate, (req, res) => {
    res.render('service/login.ejs' )
})
app.post('/login', async (req, res) => {
    let password = req.body.code || ""
    let returnedAdminUserData = await checkPassword( req, password )
    if (returnedAdminUserData.code) {
        req.flash('error_message', returnedAdminUserData.message)
        req.flash('error_code', returnedAdminUserData.code)
        res.redirect('/service/login')
    } else {
        const date = new Date();
        const timeoutValue = 10 //minutes
        req.session.session_timeout = date.getTime() + (timeoutValue * 60 * 1000) 
        res.redirect('/service')
    }
})

module.exports = app;
