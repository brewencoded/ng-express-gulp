/* jshint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    validator = require('validator'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cipher = require('../cipherService');

var Model = require('../models/Users');
/**
 * Passport configuration
 */
var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || "ThisIsAVeryInsecureTokenSecret";
var ALGORITHM = "HS256";
var ISSUER = "";
var AUDIENCE = "";

// Local strategy
var LOCAL_STRATEGY = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

passport.use(
    new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            var user = {
                email: 'test',
                password: 'password'
            };
            return done(null, user, {});
        }
    ));

/* API routes */

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// Authentication routes
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                error: 'message'
            });
        }

        //user has authenticated correctly thus we create a JWT token

        /*var token = cipher.createToken(user, SECRET, ALGORITHM, EXPIRES_IN_MINUTES, ISSUER, AUDIENCE);
        res.status(200).json({
            token: token
        });*/

    })(req, res, next);
});

router.post('/register', function(req, res, next) {
    var userName = req.body.email;
    var password = req.body.password;
    var passwordVerify = req.body.passwordVerify;
    var user;

    cipher.hashPassword(password, function(salt, hash) {
        console.log(salt + ' : ' + hash);
        //create user
        Model.User
            .forge({
                username: userName,
                password: hash,
                salt: salt
            })
            .save()
            .then(function(model) {
                var id = model.get('userId');
                user = model;

                //create userrole with userid
                Model.UserRole
                    .forge({
                        userId: id,
                        roleId: 1
                    })
                    .save()
                    .then(function(ur) {
                        cipher.createToken(model, SECRET, ALGORITHM, EXPIRES_IN_MINUTES, ISSUER, AUDIENCE, function(token) {
                        	console.log(ur);
                        	console.log(token);
                            res.status(200).json({token: token});
                        });
                    })
                    .catch(function(err) {
                        res.send(err);
                    });

            })
            .catch(function(err) {
                res.send(err);
            });
    });
});


//Send back to index to handle 404
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/index.html'));
});

module.exports = router;
