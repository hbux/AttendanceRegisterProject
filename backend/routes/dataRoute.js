// Dependencies
const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');

// Http requests
router.get('/1', dataController.createFakeData_1);
router.get('/2', dataController.createFakeData_2);

module.exports = router;