const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const keys = require('../config/keys');

class AuthenticationMiddleware {
    ensureAuthenticated = asyncHandler(async(req, res, next) => {
        try {
            let token = req.headers.authorization.split(' ')[1];

            let decodedToken = jwt.verify(token, keys.securitykey);

            req.user = await User.findById(decodedToken.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).send({ message: 'Token invalid. Unauthorized.' });
        }
    })

    ensureAdmin = asyncHandler(async(req, res, next) => {
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        let isAdmin = req.user.roles.filter(r => r === 'Admin').length > 0;

        if (isAdmin == false) {
            return res.status(403).send({ message: 'User is not authorized to access admin resources.' });
        }

        next();
    })

    ensureStudent = asyncHandler(async(req, res, next) => {
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        let isStudent = req.user.roles.filter(r => r === 'Student').length > 0;

        if (isStudent == false) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        next();
    })

    ensureModuleLeader = asyncHandler(async(req, res, next) => {
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        let isModuleLeader = req.user.roles.filter(r => r === 'Module leader').length > 0;

        if (isModuleLeader == false) {
            return res.status(403).send({ message: 'User is not authorized to access module leader resources.' });
        }

        next();
    })

    ensureTutor = asyncHandler(async(req, res, next) => {
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        let isTutor = req.user.roles.filter(r => r === 'Tutor').length > 0;

        if (isTutor == false) {
            return res.status(403).send({ message: 'User is not authorized to access tutor resources.' });
        }

        next();
    })
}

module.exports = new AuthenticationMiddleware();