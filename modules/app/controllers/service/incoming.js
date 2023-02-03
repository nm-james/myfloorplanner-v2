
const queries = require('../../../database/query')
const express = require('express');
const app = express.Router();
const passport = require('../../other/passport')
const validate = passport.validateservice
const dateConverter = require('../../other/reservation_alerter')
const uuid = require('uuid');

app.get('/incoming', validate, async (req, res) => {
    let incoming = await dateConverter.incomingReservations()
    let reservationsViaDate = await queries.exec('getIncomingReservations', []) || {}

    res.render('service/core.ejs', {requestedView: 'incoming', data: {title: 'Test', incomingReservations: incoming, reservations: reservationsViaDate, skipSort: true} } )
})

app.post('/incoming', validate, async (req, res) => {
    const reservationStatus = req.body.status
    const reservationID = req.body.reservationid

    await queries.exec('changeStatusOfIncoming', [uuid.v4(), reservationID, reservationStatus]) || {}

    let incoming = await dateConverter.incomingReservations()
    if (!incoming) {
        res.redirect('/service/reservations')
    } else {
        res.redirect('/service/incoming')
    }
})

module.exports = app;
