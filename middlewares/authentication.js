// app.use(authentication):
const jwt = require('jsonwebtoken')
const Token = require('../models/token')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']
// console.log("TONEkey",tokenKey)
    if (tokenKey) {

        if (tokenKey[0] == 'Token') { // SimpleToken
           
            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('user_id') // path: 'user_id',select: 'email'  // Only include the email field
            req.user = tokenData ? tokenData.user_id : undefined

        } else if (tokenKey[0] == 'Bearer') { // JWT

            const token= jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => req.user = userData)
           
        }
    }

    next()
}