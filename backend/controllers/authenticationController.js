const bcrypt = require('bcrypt');

const User = require('../models/user');
const tokenService = require('../services/tokenService');

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send({ message: 'Please enter all fields.' });

        return;
    }

    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            res.status(400).send({ message: 'Invalid username or password' });

            return;
        }

        var isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);

        if (!isPasswordValid) {
            res.status(400).send({ message: 'Invalid username or password.' });

            return;
        }

        var accessToken = tokenService.createToken(user);

        res.status(200).send({
            username: user.email,
            access_token: accessToken
        });
    })
}

exports.register = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        res.status(400).send({ message: 'Please enter all fields.' });

        return;
    }

    if (password != confirmPassword) {
        res.status(400).send({ message: 'Passwords do not match.' });

        return;
    }

    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            res.send('Email already exists.');
        } else {
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                hashedPassword: bcrypt.hashSync(password, 8)
            });

            user.save()
                .then(data => {
                    res.status(200).send({ message: 'Thanks. Your account has now been created.' });
                })
                .catch(error => {
                    res.status(400).send({ message: error });
                });
        }
    })
}