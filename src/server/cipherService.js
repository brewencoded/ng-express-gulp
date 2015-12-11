var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Hash the password field of the passed user.
     */
    hashPassword: function(password, cb) {
        bcrypt.genSalt(10, function(salt) {
            bcrypt.hash(password, salt, function() {
                console.log('hashing');
            }, function(hash) {
                cb(salt, hash);
            });
        });
    },

    /**
     * Compare user password hash with unhashed password
     * @returns boolean indicating a match
     */
    comparePassword: function(password, hash, cb) {
        //return bcrypt.compare(password, hash, cb);
    },

    /**
     * Create a token based on the passed user
     * @param user
     */
    createToken: function(user, secret, algorithm, expiresInMinutes, issuer, audience, callback) {
        return jwt.sign({
                user: user
            },
            secret, {
                algorithm: algorithm,
                expiresInMinutes: expiresInMinutes,
                issuer: issuer,
                audience: audience
            },
            callback
        );
    }

};
