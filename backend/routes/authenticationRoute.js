// Third-party dependencies
const express = require('express');
const router = express.Router();

const tokenService = require('../services/tokenService')

// controller dependencies
const authenticationController = require('../controllers/authenticationController');

// Http requests
router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);
router.post('/role/add', tokenService.verifyJwt, tokenService.verifyRoles('Admin'), authenticationController.addRole);

module.exports = router;