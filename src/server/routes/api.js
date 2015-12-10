/* jshint node: true */
'use strict';

var express = require('express'),
 	router = express.Router(),
 	path = require('path'),
 	validator = require('validator'),
 	bodyParser = require('body-parser'),
 	passport = require('passport'),
 	LocalStrategy = require('passport-local').Strategy,
	jwtStrategy = require('passport-jwt').Strategy,
	bcrypt = require('bcrypt-nodejs');

var Model = {
	User: require('../models/user')
};

/**
 * Passport configuration
 */
var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || "ThisIsAVeryInsecureSecretToken";
var ALGORITHM = "HS256";
var ISSUER = "";
var AUDIENCE = "";

// Local strategy
var LOCAL_STRATEGY = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

// Jwt strategy
var JWT_STRATEGY = {
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

/* API routes */

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Authentication routes
router.post('/login', function(req, res, next) {
	console.log(req.body);
	res.send('recieved request');
});

//Send back to index to handle 404
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/index.html'));
});

module.exports = router;
