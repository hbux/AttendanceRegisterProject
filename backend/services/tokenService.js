const jwt = require('jsonwebtoken');
const securityKey = require('../config/keys').securityKey;

function createToken(user) {
    var accessToken = jwt.sign({
        id: user.id,
        email: user.email,
        roles: user.roles
    }, securityKey);

    return accessToken;
}

validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send();
    }

    jwt.verify(token, securityKey, (error, user) => {
        if (error) {
            res.status(403).send();
        }

        req.user = user;

        next();
    });
}

const tokenService = {
    createToken,
    validateToken
};

module.exports = tokenService;