var cr = require('./create.js');

let config = {
    host: 'localhost',
    user: 'root',
    password: 'NMJames2004',
    port: 3307,
    multipleStatements: true
}

async function establishConnection( sql, database ) {
    config.database = database
    let con = await sql.createConnection(config)
    if (!database) {
        await cr.initDatabase(con)
        return establishConnection( sql, 'seaford_rsl' )
    }

    return con
}

module.exports = async function(sql) {
    let con = await establishConnection( sql )
    await cr.initTables( con )
    return [con, cr.initAdmin]
}   