const User = require("../models/User")


const sendTokenToCookie = (user,res) =>{

    const token = user.generateJwtFromUser()

    const {JWT_COOKIE,NODE_ENV} = process.env

    res
    .status(200)
    .cookie("access token",token,{
        expires : new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
        httpOnly: true,
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        access_token: token,
        data : {
            name : user.name,
            email: user.email
        }
    })

}

const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
}

const getAccessFromHeader = (req) =>{
    const authorization = req.headers.authorization
    const access_token = authorization.split(" ")[1]
    return access_token
}

module.exports = {
    sendTokenToCookie,
    isTokenIncluded,
    getAccessFromHeader
}