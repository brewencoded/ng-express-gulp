var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
 
module.exports = {
  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },
 
  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function(password, user){
    return bcrypt.compareSync(password, user.password);
  },
 
  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: function(user, secret, algorithm, expiresInMinutes, issuer, audience)
  {
    return jwt.sign({
        user: user.toJSON()
      },
      secret,
      {
        algorithm: algorithm,
        expiresInMinutes: expiresInMinutes,
        issuer: issuer,
        audience: audience
      }
    );
  }
  
};