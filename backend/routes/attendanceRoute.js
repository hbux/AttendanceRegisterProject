// Dependencies
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authenticationMiddleware');
const attendanceController = require('../controllers/attendanceController');

// Http requests
router.post('/', auth.ensureAuthenticated,auth.ensureStudent, attendanceController.registerCode);
router.put('/', auth.ensureAuthenticated, auth.ensureTutor, attendanceController.editStudentAttendance);

module.exports = router;