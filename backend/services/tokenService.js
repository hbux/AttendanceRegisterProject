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



const verifyJwt = (req, res, next) => {
    // This is middleware which is run after routes but before controllers
    // which ensures the user sends a token with their request 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If token is not present
    if (!token) {
        return res.status(401).send();
    }

    // Third party dependecy to validate the JWT access token
    jwt.verify(token, securityKey, (error, user) => {
        if (error) {
            return res.status(403).send();
        }

        req.user = user;

        // Next runs the next function in the http request pipeline
        next();
    });
}

const verifyRoles = (...allowedRoles) => {
    // Verifies the user sending the request is in an allowed role
    return (req, res, next) => {
        if (!req?.user.roles) {
            return res.sendStatus(401);
        }

        const rolesArray = [...allowedRoles];
        
        // Checks if the role array includes allowed roles
        const result = req.user.roles.filter(r => rolesArray.includes(r.roleName)).length > 0;

        if (!result) {
            return res.sendStatus(401);
        }

        // Next runs the next function in the http request pipeline
        next();
    }
}

const tokenService = {
    createToken,
    verifyJwt,
    verifyRoles
};

module.exports = tokenService;