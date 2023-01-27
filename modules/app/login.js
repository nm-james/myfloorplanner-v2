const express = require('express');
const app = express.Router();
const passport = require('./passport')
const reverseValidate = passport.reverseValidate
const checkPassword = passport.authenticateAdmin

app.get('/login', reverseValidate, (req, res) => {
    res.render('admin/login.ejs' )
})
app.post('/login', async (req, res) => {
    let password = req.body.password || ""
    let username = req.body.username || ""
    let returnedAdminUserData = await checkPassword( req, username, password )
    if (returnedAdminUserData.code) {
        req.flash('error_message', returnedAdminUserData.message)
        req.flash('error_code', returnedAdminUserData.code)
        res.redirect('/login')
    } else {
        req.session.adminID = returnedAdminUserData.id
        res.redirect('/')
    }
})

module.exports = app;
