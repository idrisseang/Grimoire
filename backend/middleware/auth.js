const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../key')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, SECRET_KEY)
        const userId = decodedToken.userId
        req.auth = {
            userId: userId
        }
    } catch (error) {
        res.status(401).json({ error })
    }

    next();
}