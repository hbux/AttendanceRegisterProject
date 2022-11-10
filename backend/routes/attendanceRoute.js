// Dependencies
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authenticationMiddleware');
const attendanceController = require('../controllers/attendanceController');

// Http requests
router.get('/registers/all', auth.ensureAuthenticated, auth.ensureTutor, attendanceController.getRegisters);
router.get('/registers/:id', auth.ensureAuthenticated,auth.ensureTutor, attendanceController.getRegister);
router.post('/register', auth.ensureAuthenticated,auth.ensureStudent, attendanceController.registerCode);
router.put('/activate', auth.ensureAuthenticated,auth.ensureTutor, attendanceController.activateRegister);

module.exports = router;