const queries = require('../../database/query')
const uuid = require('uuid')
function getCurrentTime() {
    let d = new Date()
    let time = d.getTime()
    return time
}

function resetAdminTimer( id ) {
    let currentTime = getCurrentTime()
    queries.exec( "updateAdminTimer", [currentTime + 1800000, id] )
}

function resetAdminSessionID( req ) {
    if (req.session.allowed_id) {
        queries.exec( "setAdminSessionID", ['', adminData.id] )
    }
    req.session.allowed_id = null
}

async function isStillLoggedIn( req, adminTime, adminDataID ) {
    const adminSessionID = await queries.exec( "getAdminSessionID", [adminDataID] )
    let adminID = adminSessionID.session_id || ''

    let currentTime = getCurrentTime()
    return (adminTime > currentTime) && (adminID == req.session.allowed_id)
}

async function validateAdmin( req, res, next ) {
    let adminData = await queries.exec( "getAdminData", [req.session.adminID || "e10e10e10e101e0"] )
    if (Object.keys(adminData).length === 0) {
        res.redirect('/service/login')
    } else {
        if ( isStillLoggedIn( req, adminData.last_joined || 0, adminData.id ) ) {            
            resetAdminTimer( adminData.id )
            next()
        } else {
            resetAdminSessionID( req )
            res.redirect('/service/login')
        }
    }
}

async function reversedValidateAdmin( req, res, next ) {
    let adminData = await queries.exec( "getAdminData", [req.session.adminID || "e10e10e10e101e0"] )
    if (Object.keys(adminData).length === 0) {
        next()
    } else {
        if ( isStillLoggedIn( req, adminData.last_joined || 0, adminData.id ) ) {
            res.redirect('/service')
            resetAdminTimer( adminData.id )
        } else {
            resetAdminSessionID( req )
            next()
        }
    }
}

let allowedIDs = {}
async function validateservice( req, res, next ) {
    const date = new Date();
    if (!req.session.session_timeout || req.session.session_timeout < date.getTime()) {
        res.redirect('/service/login')
        return
    }
    next()
}

async function reversedValidateservice( req, res, next ) {
    const date = new Date();
    if (req.session.session_timeout && req.session.session_timeout > date.getTime()) {
        res.redirect('/service')
        return
    }
    next()
}

async function checkservicePasscode( req, passcode ) {
    const currentPasscode = 2555
    if (Number(passcode) != currentPasscode) {
        return { code: 402, message: "The passcode inputted was incorrect. Please try again." }
    }
    return {}
}

const bcrypt = require('bcrypt');
async function checkPassword( req, method, id, passwordInputted ) {
    let adminData = await queries.exec( method, [id] )
    if (Object.keys(adminData).length === 0) {
        return { code: 402, message: "The username or password inputted was incorrect. Please try again." }
    } else {
        let hashedPassword = adminData.password || ""
        let shouldLetThrough = await bcrypt.compare( passwordInputted, hashedPassword )
        if (shouldLetThrough) {

            let adminID = uuid.v4()
            await queries.exec( "setAdminSessionID", [adminID, adminData.id] )
            req.session.allowed_id = adminID
            resetAdminTimer( id )
            return adminData
        } else {
            return { code: 402, message: "The username or password inputted was incorrect. Please try again." }
        }
    }
}
async function checkAdmin( req, adminUsername, passwordInputted ) {
    let data = await queries.exec('getAdminDataViaName', [adminUsername || ""]) || {}
    return checkPassword( req, "getAdminData", data.id || 0, passwordInputted )
}

async function checkservice( req, passwordInputted ) {
    return checkservicePasscode( req, passwordInputted )
}

module.exports = {
    validateAdmin: validateAdmin,
    reverseValidateAdmin: reversedValidateAdmin,
    validateservice: validateservice,
    reverseValidateservice: reversedValidateservice,
    authenticateAdmin: checkAdmin,
    authenticateservice: checkservice,
}