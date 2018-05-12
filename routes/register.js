var mongoose = require('mongoose');
var connectionDB = require('../database/connection');
var Schema = mongoose.Schema;

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

		console.log('nnnnnnnnnnnn')
		console.log(register);
		console.log('kkkkkkkkkkkk')

		register.registerUser(req, res, next);
	}
}];

var userSchema = new Schema({
	email: String,
	username: String,
	password: String
}, { timestamps: true });
var UserModel = mongoose.model('users', userSchema);

var register = {
	registerUser: async function(req, res, next) {
		var userDoc = new UserModel({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		});

		let usernameRepeat = await connectionDB({
			req, res, 
			method: 'find',
			doc: {username: req.body.username},
			model: UserModel
		});
		if(usernameRepeat.success && usernameRepeat.data.length) {
			res.status(500).json({
				success: false,
				message: '用户名已存在',
				data: null
			});
			return;
		}
		let emailRepeat = await connectionDB({
			req, res,
			method: 'find',
			doc: {email: req.body.email},
			model: UserModel
		});
		if(emailRepeat.success && emailRepeat.data.length) {
			res.status(500).json({
				success: false,
				message: 'Email已存在',
				data: null
			});
			return;
		}
		let userResult = await connectionDB({
			req,
			res,
			method: 'create',
			doc: userDoc,
			model: UserModel
		});
		res.json(userResult);
	},
	
}
