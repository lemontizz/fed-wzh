var mongoose = require('mongoose');
var connectionDB = require('../database/connection');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	email: String,
	username: String,
	password: String
}, { timestamps: true });
var UserModel = mongoose.model('users', userSchema);

module.exports = [{
	method: 'get',
	api: '/register',
	callback: function(req, res, next) {
	  	res.render('register/register');
	}
}, {
	method: 'post',
	api: '/register',
	callback: function(req, res, next) {
		var userDoc = new UserModel({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		});

		connectionDB({
			req,
			res,
			method: 'create',
			doc: userDoc,
			model: UserModel,
			success: function(result) {
				res.json({
					success: true,
					data: result
				});
			}
		});
	}
}]