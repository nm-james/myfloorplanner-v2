const express = require('express');
const app = express.Router();
const passport = require('../../other/passport')
const validation = passport.validate
const reverseValidation = passport.reverseValidate
const authenticateAdmin = passport.authenticateAdmin

app.use( '/', require('./login.js') )

app.get('/', (req, res) => {
    res.render('management/index.ejs')
})


module.exports = app;
