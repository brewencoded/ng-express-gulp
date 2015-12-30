var LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt-nodejs'),
	Model = require('../models/Users');
    
    require('../validation');

module.exports.local = new LocalStrategy({
            usernameField: 'email'
        },
        /**
         * passport strategy to validate against email and encrypted password 
         * @param  {string}   username email of user
         * @param  {string}   password unencrypted password
         * @param  {Function} done
         * @return {Object}            returns user object or error
         */ 
        function(username, password, done) {
            console.log('searching ' + username);
            new Model.User({
                    'username': username
                })
                .fetch({
                    withRelated: ['roles']
                })
                .then(function(user) {
                    if (!user) {
                        return done(null, false, {
                            message: 'Username and/or password combination invalid.'
                        });
                    } else {
                        var matches = bcrypt.compareSync(password, user.get('password'));
                        if (matches) {
                            return done(null, user.toJSON());
                        } else {
                            return done(null, false, {
                                message: 'Username and/or password combination invalid.'
                            });
                        }
                    }
                })
                .catch(function(err) {
                    return done(null, false, {
                        message: 'Something went wrong please try again later.'
                    });
                });
        }
    );
