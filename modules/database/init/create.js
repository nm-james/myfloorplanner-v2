
let databaseTables = [
    {
        name: 'customers',
        columns: ['id', 'name', 'phone_number', 'email', 'last_reserved']
    },
    {
        name: 'reservations',
        columns: ['id', 'customer_id', 'admin_id', 'date', 'name', 'numbers', 'phone', 'email', 'time', 'notes', 'arrived', 'tableNumber']

    },
    {
        name: 'admins',
        columns: ['id', 'name', 'date_joined', 'admin_level', 'password', 'last_joined', 'session_id']
    },
]
let defaultDataType = {
    "reservation_number": 'INT',
    "admin_level": 'INT',
    "last_joined": 'BIGINT',
    "arrived": 'BOOLEAN',
    "tableNumber": "INT",
    "time": "TIME"
}

function checkTables( con, res ) {
    let queryString = ""
    for (x in databaseTables) {
        const tableData = databaseTables[x]
        queryString += "CREATE TABLE IF NOT EXISTS " + tableData.name + " ("
        for (i in tableData.columns) {
            const columnName = tableData.columns[i]
            queryString += columnName
            if (defaultDataType[columnName]) {
                queryString += ' ' + defaultDataType[columnName]
            } else {
                queryString += ' TEXT'
            }
            if (Number(i) + 1 != tableData.columns.length) {
                queryString += ', '
            }
        }
        queryString += ' )'

        if (Number(x) + 1 != databaseTables.length) {
            queryString += '; '
        }
    }
    con.query(queryString)
}
async function createTables( con ) {
    await checkTables( con )
    console.log('TABLES HAVE BEEN CHECKED!')
}

function checkDatabase( con ) {
    con.query("CREATE DATABASE IF NOT EXISTS seaford_rsl")
}
async function createDatabase( con ) {
    await checkDatabase( con )
    console.log('DATABASE HAS INITIALIZED!')
}

const sender = require('../../email/send')
const bcrypt = require('bcrypt');

async function insertDefaultAdmin( con, exec ) {
    const hasAdmin = await exec('getAdminData', ['admin'])
    if (Object.keys(hasAdmin).length != 0) {
        return null
    }
    const newPassword = (Math.random() + 1).toString(36).substring(2);
    let hashedPassword = await bcrypt.hash(newPassword, 10)
    let d = new Date()
    let dateJoined =  d.getDate() + '-' + Number(d.getMonth()+1) + '-' + d.getFullYear();
    exec('insertNewAdmin', ['admin', 'admin', dateJoined, 10, hashedPassword, 0])
    sender.singleEmail( sender.email, 'SEAFORD RSL RESERVATION MANAGEMENT - ADMIN ACCOUNT CREATED', `
        <h1>Your Seaford RSL Reservation System is ready to go!</h1>
        <p>To get started, please use the following login to organise sister accounts:</p>
        <li>Username: admin</li>
        <li>Password: ` + newPassword + `</li>
        <br />
        <p>Thank you for using this reservation system.
    `)
}

module.exports = {
    initDatabase: async function( con ) {
        await createDatabase( con )
    },
    initTables: async function( con ) {
        await createTables( con )
    },
    initAdmin: async function( con, commands ) {
        await insertDefaultAdmin( con, commands )
    }
}