const queries = require('../../../database/query')
const express = require('express');
const app = express.Router();
const passport = require('../../other/passport')
const validate = passport.validateservice
const dateConverter = require('../../other/reservation_alerter')

app.get('/reservations', validate, async (req, res) => {
    let data = dateConverter.convertDate( req.session.dateRequested )
    let stringedDate = data[0]
    let serviceTiming = req.session.serviceTiming
    stringedTime = "12:00:00"
    if (!serviceTiming) {
        stringedTime = data[1]
    } else {
        if (serviceTiming == "Lunch") {
            stringedTime = "12:00:00"
        } else {
            stringedTime = "17:00:00"
        }
    }

    let reservationsViaDate = {}
    if (stringedTime < '16:30:00') {
        reservationsViaDate = await queries.exec('getConfirmedReservationViaDate', [stringedDate, "11:30:00", "16:29:00"]) || {}
        serviceTiming = "Lunch"
    } else {
        reservationsViaDate = await queries.exec('getConfirmedReservationViaDate', [stringedDate, "16:30:00", "20:30:00"]) || {}
        serviceTiming = "Dinner"
    }
    let incoming = await dateConverter.incomingReservations()

    res.render('service/core.ejs', {requestedView: 'reservations', data: {title: 'Admin', reservations: reservationsViaDate, dateRequested: stringedDate, serviceTiming: serviceTiming, incomingReservations: incoming, skipSort: false} } )
    req.session.dateRequested = null
    req.session.serviceTiming = null
})
app.post('/reservations', validate, async (req, res) => {
    const dateRequested = req.body.dateRequested
    const serviceRequested = req.body.serviceTiming

    req.session.dateRequested = dateRequested
    req.session.serviceTiming = serviceRequested

    res.redirect('/service/reservations')
})
app.use( '/', require('./login.js') )

module.exports = app;
