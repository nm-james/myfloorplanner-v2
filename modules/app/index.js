const queries = require('../database/query')
const express = require('express');
const app = express.Router();
const passport = require('./passport')
const validate = passport.validate

app.get('/', validate, async (req, res) => {
    let currentTimeObject = new Date()
    let stringedDate = req.session.dateRequested || currentTimeObject.toISOString().split('T')[0]
    let currentDate = new Date( stringedDate )
    let proposedDateIsolated = currentDate.toISOString().split('T')[0]
    let time = currentTimeObject.toLocaleTimeString().split(' ')[0]
    let reservationsViaDate = {}
    if (time < '16:30:00') {
        reservationsViaDate = await queries.exec('getReservationViaDate', [proposedDateIsolated, "11:30:00", "16:29:00", proposedDateIsolated]) || {}
    } else {
        reservationsViaDate = await queries.exec('getReservationViaDate', [proposedDateIsolated, "16:30:00", "20:30:00", proposedDateIsolated]) || {}
    }

    res.render('admin/core.ejs', {requestedView: 'index', data: {title: 'Admin', reservations: reservationsViaDate, dateRequested: stringedDate} } )
    req.session.dateRequested = null

})
app.post('/', validate, async (req, res) => {
    const dateRequested = req.body.dateRequested

    req.session.dateRequested = dateRequested

    res.redirect('/')
})

module.exports = app;
