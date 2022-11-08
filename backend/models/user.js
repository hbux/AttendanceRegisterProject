const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    roles: [{
        type: String
    }]
});

const user = mongoose.model('User', User);

module.exports = user;