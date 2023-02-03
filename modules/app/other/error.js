const express = require('express');
const app = express.Router();

app.get('/error', (req, res) => {
    res.render('misc/error.ejs')
})


module.exports = app;