var validator = require('validator');

/**
 * Check to make sure email is in proper format
 * @param  {string} email email address
 * @return {string}       either invalid for errors or a normalized email for valid
 */
function validateEmail (email) {
	if(!email || email.trim() === '') {
		return "invalid";
	}
	//clean
	var normalEmail = validator.normalizeEmail(email.toString().trim());
	var valid = validator.isEmail(normalEmail);
	if (valid) {
		return normalEmail;
	} else {
		return "invalid";
	}
}

/**
 * Checks for a valid password
 * @param  {string} password password to be validated
 * @return {boolean}          true or false depending on validit of password
 */
function validatePassword(password) {
	if (password.length >= 6) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	email: validateEmail,
 	password: validatePassword
 };