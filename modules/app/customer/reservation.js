const emailValidator = require('deep-email-validator');
const sender = require('../../email/send');
const queries = require('../../database/query')
const uuid = require('uuid');

const express = require('express');
const app = express.Router();


async function checkReservationForAvailability( body ) {
    if (body.reservationDate != "" && body.reservationName != "" && body.reservationNumbers != 0 && body.reservationEmail != "" && body.reservationPhone != "" && body.reservationTime != "") {


        let currentDate = new Date();
        let proposedDate = new Date( body.reservationDate + ", " + body.reservationTime + ":00");

        if (currentDate > proposedDate || (currentDate.getTime() + (60 * 60 * 1000)) > proposedDate.getTime() && currentDate == proposedDate) {
            return false
        }

        let email = body.reservationEmail
        const isValid = await emailValidator.validate( email )
        return isValid.valid
    }
    return false
}

function formulateEmail( body ) {
    let html = ``
    html += `<div>`
    html += `<li>Reservation Date: ` + body.reservationDate + `</li>`
    html += `<li>Reservation Name: ` + body.reservationName + `</li>`
    html += `<li>Reservation Size: ` + body.reservationNumbers + `</li>`
    html += `<li>Reservation Time: ` + body.reservationTime + `</li>`
    html += `<li>Reservation Phone Number: ` + body.reservationPhone + `</li>`
    html += `<li>Reservation Email: ` + body.reservationEmail + `</li>`
    html += `</div>`
    return html
}

async function finaliseReservationData( req ) {
    let newID = await uuid.v4()
    let dataCheck = await queries.exec( 'getReservationData', [ newID ] )
    if (Object.keys(dataCheck).length != 0) {
        return finaliseReservationData( req )
    }
    queries.exec( 'insertNewReservation', [ newID, req.body.reservationDate, req.body.reservationName, Number(req.body.reservationNumbers), req.body.reservationPhone, req.body.reservationEmail, req.body.reservationTime, req.body.reservationNotes, false, 0 ] )
}

app.get('/reservation', (req, res) => {
    res.render('customer/reservation.ejs')
})

app.post('/reservation', async (req, res) => {
    let confirmedReservation = await checkReservationForAvailability( req.body )
    let message = 'You have not correctly filled the details required for processing a new reservation. Please try again or contact us at Seaford RSL to process a booking via the phone. We apologise for the inconvenience.'
    if (confirmedReservation) {
        message = 'We are currently processing your reservation and also sent you an email regarding the details of your upcoming booking. Please wait for a follow up confirmation email or response before arriving at Seaford RSL. Thanks for booking at Seaford RSL.'
        sender.singleEmail( req.body.reservationEmail, 'Seaford RSL - New Reservation', formulateEmail( req.body ) )
        finaliseReservationData( req )
    }
    req.flash('response', message)
    res.redirect('/reservation')
})
module.exports = app;
