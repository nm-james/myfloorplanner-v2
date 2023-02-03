const express = require('express');
const app = express.Router();
const passport = require('../../other/passport')
const validate = passport.validateservice
const dateConverter = require('../../other/reservation_alerter')

app.get('/layout', async (req, res) => {
    let incoming = await dateConverter.incomingReservations()
    res.render('service/core.ejs', {requestedView: 'layout', data: {title: 'Test', incomingReservations: incoming} } )
})



module.exports = app;
