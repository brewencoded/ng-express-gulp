/* jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function (req, res) {
    res.sendFile(__dirname + 'client/public/index.html');
});

module.exports = router;

