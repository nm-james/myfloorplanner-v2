const express = require('express');
const app = express.Router();
const passport = require('../other/passport')
const validation = passport.validate
const reverseValidation = passport.reverseValidate
const authenticateAdmin = passport.authenticateAdmin

app.get('/index', (req, res) => {
    res.render('management/index.ejs')
})


module.exports = app;
