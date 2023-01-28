
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const uuid = require('uuid');
const path = require('path')

const app = express();

app.use( express.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use(session({
    secret: 'adsagrekjrttk',
    resave: false,
    saveUninitialized: true,
    genid: function(req) { return uuid.v4(); },
}))
app.use( flash() );

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

require('./modules/database/init/main')
app.use( '/management', require('./modules/app/management/index.js') )
app.use( '/service', require('./modules/app/service/index.js') )
app.use( '/', require('./modules/app/customer/index.js') )

app.use('/public', express.static(__dirname + '/public' ));

app.set('trust proxy', 1)

app.set('view engine', 'ejs');


app.listen(3000);

exports.application = app;