var express = require('express');
var router = express.Router();

var middleware = require("../middleware/middleware.js");
var HandlerGenerator = require("../middleware/handlegenerator.js");

HandlerGenerator = new HandlerGenerator();

router.post('/login', HandlerGenerator.login);

router.post('/signin', HandlerGenerator.signin);

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

module.exports = router;

