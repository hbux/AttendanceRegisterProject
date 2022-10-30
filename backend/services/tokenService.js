const jwt = require('jsonwebtoken');
const securityKey = require('../config/keys').securityKey;

function createToken(user) {
    // Creates a token based on user details
    var accessToken = jwt.sign({
        id: user.id,
        email: user.email,
        roles: user.roles
    }, securityKey);

    return accessToken;
}

validateToken = (req, res, next) => {
    // This is middleware which is run after routes but before controllers
    // which ensures the user sends a token with their request 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If token is not present
    if (!token) {
        res.status(401).send();
    }

    // Third party dependecy to validate the JWT access token
    jwt.verify(token, securityKey, (error, user) => {
        if (error) {
            res.status(403).send();
        }

        req.user = user;

        // Next runs the next function in the http request pipeline
        next();
    });
}

const tokenService = {
    createToken,
    validateToken
};

module.exports = tokenService;