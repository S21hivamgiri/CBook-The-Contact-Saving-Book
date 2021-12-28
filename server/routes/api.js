var express = require('express');
var router = express.Router();

router.use('/contact',require('../apis/contact.api'));
router.use('/feedback',require('../apis/feedback.api'));

module.exports = router;
