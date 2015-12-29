var validator = require('validator');

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