// Dependencies
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authenticationMiddleware');
const userController = require('../controllers/userController');

// Http requests
router.get('/', auth.ensureAuthenticated, auth.ensureAdmin, userController.getAllUsers);
router.post('/login', userController.login);
router.post('/register', auth.ensureAuthenticated, auth.ensureAdmin, userController.register);
router.put('/', auth.ensureAuthenticated, auth.ensureAdmin, userController.updateUser);
router.delete('/:id', auth.ensureAuthenticated, auth.ensureAdmin, userController.deleteUser);

module.exports = router;