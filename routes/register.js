var mongoose = require('mongoose');
var connectionDB = require('../database/connection');
var mod = require('../model/user');
// var Schema = mongoose.Schema;

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
		register.registerUser(req, res, next);
	}
}];

// var userSchema = new Schema({
// 	email: String,
// 	username: String,
// 	password: String
// }, { timestamps: true });
// var mod.Model = mongoose.model('users', userSchema);

var register = {
	registerUser: async function(req, res, next) {
		var userDoc = new mod.Model({
			username: req.body.username,
			password: unescape(req.body.password),
			email: req.body.email,
			role: 'user'
		});

		let usernameRepeat = await connectionDB({
			req, res, 
			method: 'find',
			options: [{username: req.body.username}],
			model: mod.Model
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
			options: [{email: req.body.email}],
			model: mod.Model
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
			options: [userDoc],
			model: mod.Model
		});
		res.json({
			success: true,
			message: '',
			data: {
				username: userResult.username
			}
		});
	},
	
}
