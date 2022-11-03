// Third-party dependencies
const express = require('express');
const router = express.Router();

const tokenService = require('../services/tokenService')

// controller dependencies
const authenticationController = require('../controllers/authenticationController');

// Http requests
// Verify user is authenticated: tokenService.verifyJwt
// Verify user is in a role: tokenService.verifyRoles(roles)
router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);
router.post('/role/add', authenticationController.addRole);

module.exports = router;