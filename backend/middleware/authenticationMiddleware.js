const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const keys = require('../config/keys');

class AuthenticationMiddleware {
    // Middleware to ensure the token is valid
    ensureAuthenticated = asyncHandler(async(req, res, next) => {
        try {
            // request headers are 'Bearer <token>'
            // splitting on a space and retrieving the second item gives us 
            // just the access token 
            let token = req.headers.authorization.split(' ')[1];

            // Decode the access token
            let decodedToken = jwt.verify(token, keys.securitykey);

            // Find a user by id from the decoded token
            req.user = await User.findById(decodedToken.id).select('-password');

            next();
        } catch (error) {
            // Something failed so the request is not authorized
            return res.status(401).send({ message: 'Token invalid. Unauthorized.' });
        }
    })

    // Middleware to ensure the user has a role of admin
    ensureAdmin = asyncHandler(async(req, res, next) => {
        // If no roles exist, user is not authorized for admin resources
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        // if length is bigger than 0, it means the user is an admin
        let isAdmin = req.user.roles.filter(r => r === 'Admin').length > 0;

        if (isAdmin == false) {
            // return unauthorized as user is not an admin
            return res.status(403).send({ message: 'User is not authorized to access admin resources.' });
        }

        // moves to the next http pipeline
        next();
    })

    // Middleware to ensure the user has a role of student
    ensureStudent = asyncHandler(async(req, res, next) => {
        // If no roles exist, user is not authorized for student resources
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        // if length is bigger than 0, it means the user is a student
        let isStudent = req.user.roles.filter(r => r === 'Student').length > 0;

        if (isStudent == false) {
            // return unauthorized as user is not an admin
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        // moves to the next http pipeline
        next();
    })

    // Middleware to ensure the user has a role of module leader
    ensureModuleLeader = asyncHandler(async(req, res, next) => {
        // If no roles exist, user is not authorized for ML resources
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        // if length is bigger than 0, it means the user is a module leader
        let isModuleLeader = req.user.roles.filter(r => r === 'Module leader').length > 0;

        if (isModuleLeader == false) {
            // return unauthorized as user is not a ML
            return res.status(403).send({ message: 'User is not authorized to access module leader resources.' });
        }

        // moves to the next http pipeline
        next();
    })

    // Middleware to ensure the user has a role of tutor
    ensureTutor = asyncHandler(async(req, res, next) => {
        // If no roles exist, user is not authorized for tutor resources
        if (!req.user.roles) {
            return res.status(403).send({ message: 'User is not authorized to access student resources.' });
        }

        // if length is bigger than 0, it means the user is a tutor
        let isTutor = req.user.roles.filter(r => r === 'Tutor').length > 0;

        if (isTutor == false) {
             // return unauthorized as user is not a tutor
            return res.status(403).send({ message: 'User is not authorized to access tutor resources.' });
        }

        // moves to the next http pipeline
        next();
    })
}

module.exports = new AuthenticationMiddleware();