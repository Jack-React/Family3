var express = require('express');
var controller = require('../controllers/controller.js');

var router = express.Router();

// login page
router.get('/', controller.login);

module.exports = router;