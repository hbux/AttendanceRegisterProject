// Dependencies
const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const registerController = require('../controllers/registerController');

// Http requests
router.post('/code', 
    authenticationMiddleware.ensureAuthenticated,
    authenticationMiddleware.ensureStudent, 
    registerController.registerCode);

router.put('/activate', 
    authenticationMiddleware.ensureAuthenticated,
    authenticationMiddleware.ensureTutor,
    registerController.activateRegister);

router.get('/getall', 
    authenticationMiddleware.ensureAuthenticated,
    authenticationMiddleware.ensureTutor, 
    registerController.getRegisters);
    
router.get('/fake', registerController.createFakeData);

module.exports = router;