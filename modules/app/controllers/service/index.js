const express = require('express');
const app = express.Router();
const passport = require('../../other/passport')
const validate = passport.validateservice
const dateConverter = require('../../other/reservation_alerter')

app.use( '/', require('./login.js') )
app.use( '/', require('./reservations.js') )
app.use( '/', require('./incoming.js') )
app.use( '/', require('./layout.js') )


app.get('/', validate, async (req, res) => {
    let incoming = await dateConverter.incomingReservations()
    res.render('service/core.ejs', {requestedView: 'index', data: {title: 'Test', incomingReservations: incoming} } )
})



module.exports = app;
