const sql = require('mysql2/promise');
let dbConnection = false;
var db_init = require('./connection')(sql);
var cr = require('./create.js');


db_init.then( async ( data ) => {
    const con = data[0]
    dbConnection = con
    let queries = require('../query')
    await queries.init( con )
    data[1]( con, queries.exec )
    module.exports = {
        connection: () => {
            return dbConnection
        }
    }
})

