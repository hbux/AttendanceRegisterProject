// Third-party dependencies
const bcrypt = require('bcrypt');

// models and service dependencies
const User = require('../models/user');
const tokenService = require('../services/tokenService');

// Login request
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Validation check to ensure email and password are present
    if (!email || !password) {
        res.status(400).send({ message: 'Please enter all fields.' });

        return;
    }

    // Attempt to find a user with a matching email
    User.findOne({
        email: email
    }).then(user => {
        // If user could not be found return error message
        if (!user) {
            res.status(400).send({ message: 'Invalid username or password' });

            return;
        }

        // Using third party dependency to manage password security (hashing)
        var isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);

        // Ensures the password matches what the users entered
        if (!isPasswordValid) {
            res.status(400).send({ message: 'Invalid username or password.' });

            return;
        }

        // Create a JWT token
        var accessToken = tokenService.createToken(user);

        // return success status with the token created
        res.status(200).send({
            username: user.email,
            access_token: accessToken
        });
    })
}

// Registration
exports.register = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validation on each parameter
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        res.status(400).send({ message: 'Please enter all fields.' });

        return;
    }

    // Ensures passwords are the same
    if (password != confirmPassword) {
        res.status(400).send({ message: 'Passwords do not match.' });

        return;
    }

    // Attempting to find a matching email (emails must be unique)
    User.findOne({
        email: email
    }).then(user => {
        // If user is found, email already exists
        if (user) {
            res.status(400).send({ message: 'Email already exists.'});
        } else {
            // Creating the new user and hashing the password
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                hashedPassword: bcrypt.hashSync(password, 8)
            });

            // Saves the user in the database
            user.save()
                .then(data => {
                    // Success = 200 status code
                    res.status(200).send({ message: 'Thanks. Your account has now been created.' });
                })
                .catch(error => {
                    // Something went wrong with adding to the database, return bad request
                    res.status(400).send({ message: error });
                });
        }
    })
}

// Adds a role to a user
exports.addRole = (req, res) => {
    const { email, roleName } = req.body;

    if (!email || !roleName) {
        res.status(400).send({ message: 'Please enter all fields.' });

        return;
    }

    User.findOne({
        email: email
    }).then(user => {
        user.roles.push({
            roleName: roleName
        });

        user.save()
            .then(data => {
                // Success = 200 status code
                res.status(200).send({ message: 'Thanks. Role has been added.' });
            })
            .catch(error => {
                // Something went wrong with adding to the database, return bad request
                res.status(400).send({ message: error });
            });
    });
}