// Third-party dependencies
const express = require('express');
const router = express.Router();

// controller dependencies
const authenticationController = require('../controllers/authenticationController');

// Http requests
router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);

module.exports = router;