function turnToDate( dateRequested ) {
    let stringedDate = dateRequested
    let stringedTime = "00:00:00"
    if (!stringedDate) {
        let currentTimeObject = new Date()
        let dateAndTime = currentTimeObject.toLocaleString('en-UK', {timeZone: "Australia/Melbourne"}).split(', ')
        let seperatedStringDate = dateAndTime[0].split('/')
        stringedDate = seperatedStringDate[2] + "-" + seperatedStringDate[1] + "-" + seperatedStringDate[0] 
        stringedTime = dateAndTime[1]
    }

    return [stringedDate, stringedTime]
}
async function hasIncomingBookings() {
    let incomingReservations = await queries.exec('getIncomingBookings', [stringedDate])
    if (incomingReservations.count > 0) {
        return true
    }
    return false
}
module.exports = {
    convertDate: turnToDate
}