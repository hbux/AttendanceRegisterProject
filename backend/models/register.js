const mongoose = require('mongoose');

const Register = mongoose.Schema({
    dateActivated: {
        type: Date,
        required: false
    },
    dateClosed: {
        type: Date,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true
    },
    code: {
        type: String,
        required: false
    },
    module: {
        moduleId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        moduleLeader: {
            staffId: {
                type: Number,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    },
    tutor: {
        staffId: {
            type: Number,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    class: {
        startDate: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        students: [{
            studentId: {
                type: Number,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            hasRegistered: {
                type: Boolean,
                required: true
            }
        }]
    }
})

const register = mongoose.model('Register', Register);

module.exports = register;