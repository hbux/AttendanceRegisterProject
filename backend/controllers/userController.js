const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const keys = require('../config/keys');

class UserController {
    login = asyncHandler(async(req, res) => {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Please enter all required fields.' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Invalid username or password.' });
        }

        var isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);

        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid username or password.' });
        }

        var accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, keys.securityKey);

        return res.status(200).send({
            username: user.email,
            access_token: accessToken
        })
    })

    register = asyncHandler(async(req, res) => {
        const { firstName, lastName, email, password, confirmPassword, roleName } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !roleName) {
            return res.status(400).send({ message: 'Please enter all fields.' });
        }

        if (password != confirmPassword) {
            return res.status(400).send({ message: 'Passwords do not match.' });
        }

        let userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send({ message: 'Email already in use.' });
        }

        let encryptedPassword  = bcrypt.hashSync(password, 8);

        let roles = [{
            roleName
        }]
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            hashedPassword: encryptedPassword,
            roles
        })

        if (user) {
            return res.status(200).send({ message: 'Thanks, your account has been created.' });
        } else {
            return res.status(400).send({ message: 'Something went wrong creating your account.' })
        }
    })
}

module.exports = new UserController();