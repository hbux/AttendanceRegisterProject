// Dependencies
const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');

// Http requests
router.get('/', roleController.getAll);

module.exports = router;