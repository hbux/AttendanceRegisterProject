const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const keys = require('../config/keys');

class AuthenticationMiddleware {
    ensureAuthenticated = asyncHandler(async(req, res, next) => {
        if ((req.headers.authorization && req.headers.authorization.startsWith('Bearer')) == false) {
            return res.status(403).send({ message: 'Unauthorized, no token found.' });
        }

        try {
            let token = req.headers.authorization.split(' ')[1];
            let decodedToken = jwt.verify(token, keys.securitykey);

            req.user = await User.findById(decodedToken.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).send({ message: error });
        }
    })
}

module.exports = new AuthenticationMiddleware();