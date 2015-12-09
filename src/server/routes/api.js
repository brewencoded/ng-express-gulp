/* jshint node: true */
'use strict';

var express = require('express'),
 	router = express.Router(),
 	path = require('path');

/* API routes */

router.post('/login', function(req, res, next) {
    res.send('recieved request');
});

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/index.html'));
});

module.exports = router;
