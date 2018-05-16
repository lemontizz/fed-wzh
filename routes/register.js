var mongoose = require('mongoose');
var operationDB = require('../database/operation-db');
var mod = require('../model/user');

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

var register = {
	registerUser: async function(req, res, next) {
		var userDoc = new mod.Model({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			role: 'user'
		});

		let usernameRepeat = await operationDB({
			req, res, 
			method: 'find',
			options: [{username: req.body.username}],
			model: mod.Model,
			addLog: false
		});
		if(usernameRepeat.success && usernameRepeat.data.length) {
			res.status(500).json({
				success: false,
				message: '用户名已存在',
				data: null
			});
			return;
		}
		let emailRepeat = await operationDB({
			req, res,
			method: 'find',
			options: [{email: req.body.email}],
			model: mod.Model,
			addLog: false
		});
		if(emailRepeat.success && emailRepeat.data.length) {
			res.status(500).json({
				success: false,
				message: 'Email已存在',
				data: null
			});
			return;
		}
		let userResult = await operationDB({
			req, res,
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
