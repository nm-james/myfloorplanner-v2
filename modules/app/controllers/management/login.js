const express = require('express');
const app = express.Router();
const passport = require('../../other/passport')
const reverseValidate = passport.reverseValidateAdmin
const checkPassword = passport.authenticateAdmin

app.get('/login', reverseValidate, (req, res) => {
    res.render('management/login.ejs' )
})
app.post('/login', async (req, res) => {
    let password = req.body.password || ""
    let username = req.body.username || ""
    let returnedAdminUserData = await checkPassword( req, username, password )
    if (returnedAdminUserData.code) {
        req.flash('error_message', returnedAdminUserData.message)
        req.flash('error_code', returnedAdminUserData.code)
        res.redirect('/service/login')
    } else {
        req.session.adminID = returnedAdminUserData.id
        res.redirect('/service')
    }
})

module.exports = app;
