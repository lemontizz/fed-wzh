define(function(require, exports, module) {
	module.exports = {
		emailRule: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
		passwordRule: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
		passwordLengthRule: /^[A-Za-z0-9!@#$%^&*? ]{6,}$/,
		passwordSpecialRule: /[!@#$%^&*? ]+/,
		passwordLetter: /[A-Za-z]+/,
		passwordNumber: /[0-9]+/,
	}
});