/* jshint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    validator = require('validator'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cipher = require('../cipherService'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    strategies = require('./passportStrategies');

var Model = require('../models/Users');
/**
 * Jwt configuration
 */
var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || require('../secret.js');
var ALGORITHM = "HS256";
var ISSUER = "";
var AUDIENCE = "";

// Local strategy
var LOCAL_STRATEGY = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

// TODO: implement server side validation
passport.use(strategies.local);

// Authentication middleware
function tokenAuth(req, res, next) {
    var headers = req.headers;
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];

            jwt.verify(token, SECRET, function(err, decoded) {
                if (err) {
                    res.json({
                        message: 'You are not logged in.'
                    });
                } else {
                    next();
                }
            });

        } else {
            res.status(401).json({
                message: 'You are not authorized to access this content'
            });
        }
    } else {
        res.status(401).json({
            message: 'You are not authorized to access this content'
        });
    }
}

router.use('/auth', tokenAuth);
router.use('/api', tokenAuth);

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
                error: err
            });
        }
        //user has authenticated correctly thus we create a JWT token
        cipher.createToken(user, SECRET, ALGORITHM, EXPIRES_IN_MINUTES, ISSUER, AUDIENCE, function(token) {
            res.status(200).json({
                token: token,
                user: user
            });
        });

    })(req, res, next);
});

router.post('/register', function(req, res) {
    var userName = req.body.email;
    var password = req.body.password;
    var passwordVerify = req.body.passwordVerify;
    var user;

    cipher.hashPassword(password, function(hash, salt) {
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

                //create userrole with userid
                Model.UserRole
                    .forge({
                        userId: id,
                        roleId: 1
                    })
                    .save()
                    .then(function(ur) {
                        var user = model.toJSON();
                        user.roles = ur.toJSON();
                        console.log(user);

                        cipher.createToken(user, SECRET, ALGORITHM, EXPIRES_IN_MINUTES, ISSUER, AUDIENCE, function(token) {
                            res.status(200).json({
                                token: token,
                                user: user
                            });
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

router.get('/auth', function(req, res) {
    res.status(200).json({
        authenticated: true
    });
});

//api routes
router.get('/api/user', function(req, res) {
    new Model.User({
            'username': req.decodedToken.username
        })
        .fetch({
            withRelated: ['roles']
        })
        .then(function(user) {
            var userInfo = user.toJSON();
            res.status(200).json({
                username: userInfo.username,
                roles: userInfo.roles
            });
        })
        .catch(function(err) {

        });
});

//Send back to index to handle 404
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/index.html'));
});

module.exports = router;
