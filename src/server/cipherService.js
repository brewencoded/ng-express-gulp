var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Hash the password field of the passed user.
     * @param  {string}   password password to be hashed
     * @param  {Function} cb       callback that recieves hashed password
     * @return {string}            hashed password
     */
    hashPassword: function(password, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return console.error(err);
            }

            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) {
                    return console.error(err);
                }
                cb(hash, salt);
            });
        });
    },

    /**
     * Compare user password hash with unhashed password
     * @param  {string}   password  unhashed password to compare
     * @param  {string}   hash      hashed password to compare
     * @param  {Function} cb        callback that recives success or failure
     * @return {boolean}            true or false on whether passwords match
     */
    comparePassword: function(password, hash, cb) {
        //return bcrypt.compare(password, hash, cb);
    },

    /**
     * Create a token based on the passed user
     * @param  {Object}   user             user object payload
     * @param  {string}   secret           secret used in hash
     * @param  {string}   algorithm        algorithm to use in hash
     * @param  {number}   expiresInMinutes expiraton time of token
     * @param  {string}   issuer           optional
     * @param  {string}   audience         optional
     * @param  {Function} callback         callback to recieve token once created
     * @return {Object}                    token object
     */
    createToken: function(user, secret, algorithm, expiresInMinutes, issuer, audience, callback) {
        return jwt.sign(
            user,
            secret, {
                algorithm: algorithm,
                expiresIn: expiresInMinutes,
                issuer: issuer,
                audience: audience
            },
            callback
        );
    }

};
