let commands = []

async function createNewPreparedStatement( con, query, command, avoidSelectiveData ) {
    let queryStatement = await con.prepare(query)
    commands[command] = async ( values ) => {
        let data = await queryStatement.execute( values ) || [ [ {} ] ]
        let sortedData = data[0]
        if (avoidSelectiveData) {
            return sortedData || {}
        }

        return sortedData[0] || {}
    }
}
async function initializeQueries( con ) {
    await createNewPreparedStatement( con, 'SELECT * FROM admins WHERE id = ?', 'getAdminData' )
    await createNewPreparedStatement( con, 'SELECT * FROM admins WHERE name = ?', 'getAdminDataViaName' )
    await createNewPreparedStatement( con, 'UPDATE admins SET last_joined = ? WHERE id = ?', 'updateAdminTimer' ) 
    await createNewPreparedStatement( con, 'INSERT INTO admins(`id`, `name`, `date_joined`, `admin_level`, `password`, `last_joined`) VALUES(?, ?, ?, ?, ?, ?)', 'insertNewAdmin' )
    await createNewPreparedStatement( con, 'INSERT INTO reservations(`id`, `date`, `name`, `numbers`, `phone`, `email`, `time`, `notes`, `arrived`, `tableNumber`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 'insertNewReservation' )
    await createNewPreparedStatement( con, 'SELECT * FROM reservations WHERE id = ?', 'getReservationData' )
    await createNewPreparedStatement( con, "SELECT * FROM reservations WHERE (date = ? AND time >= ? AND time <= ?)", 'getReservationViaDate', true )
    await createNewPreparedStatement( con, "SELECT * FROM reservations WHERE (date = ? AND time >= ? AND time <= ? AND date = CURDATE() AND name LIKE CONCAT('%', ?, '%')) OR (date = ? AND name LIKE CONCAT('%', ?, '%'))", 'getReservationViaDateAndName', true )
    await createNewPreparedStatement( con, "UPDATE admins SET session_id = ? WHERE id = ?", 'setAdminSessionID' )
    await createNewPreparedStatement( con, "SELECT session_id FROM admins WHERE id = ?", 'setAdminSessionID' )
}


async function executeCommand( commandLine, data ) {
    if (!commands[commandLine]) return {}
    return commands[commandLine]( data )
}


module.exports = {
    init: initializeQueries,
    exec: executeCommand,
    getCommands: function() {
        return commands
    }
}