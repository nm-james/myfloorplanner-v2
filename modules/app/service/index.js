const queries = require('../../database/query')
const express = require('express');
const app = express.Router();
const passport = require('../other/passport')
const validate = passport.validateservice

app.use( '/', require('./login.js') )
app.use( '/', require('./reservations.js') )

app.get('/', validate, async (req, res) => {
    
    res.render('service/core.ejs', {requestedView: 'index', data: {title: 'Test'} } )
})



module.exports = app;
