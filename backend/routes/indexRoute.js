// Third-party dependencies
const express = require('express');
const router = express.Router();

// controller dependencies
const indexController = require('../controllers/indexController');

// Http requests
router.get('/', indexController.index);

module.exports = router;