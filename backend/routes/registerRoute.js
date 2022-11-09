// Dependencies
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authenticationMiddleware');
const registerController = require('../controllers/registerController');

// Http requests
router.get('/getall', auth.ensureAuthenticated, auth.ensureTutor, registerController.getRegisters);
router.get('/get/:id', auth.ensureAuthenticated,auth.ensureTutor, registerController.getRegister);
router.post('/code', auth.ensureAuthenticated,auth.ensureStudent, registerController.registerCode);
router.put('/activate', auth.ensureAuthenticated,auth.ensureTutor, registerController.activateRegister);

module.exports = router;