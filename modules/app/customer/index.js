const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('customer/index.ejs')
})

app.use( '/', require('./reservation.js') )

module.exports = app;
