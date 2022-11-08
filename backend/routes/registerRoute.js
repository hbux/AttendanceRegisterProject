// Dependencies
const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const registerController = require('../controllers/registerController');

// Http requests
router.post('/', 
    authenticationMiddleware.ensureAuthenticated,
    authenticationMiddleware.ensureStudent, 
    registerController.registerCode);

router.post('/activate', 
    authenticationMiddleware.ensureAuthenticated,
    authenticationMiddleware.ensureTutor,
    registerController.activateRegister);
    
router.get('/', registerController.createFakeData);

module.exports = router;