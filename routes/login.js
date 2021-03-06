var mod = require('../model/user');
var operationDB = require('../database/operation-db');

module.exports = [{
	method: 'get',
	api: '/login',
	callback: function(req, res, next) {
	  res.render('login/login', { title: 'Login' });
	}
}, {
	method: 'post',
	api: '/login',
	callback: function(req, res, next) {
		login.login(req, res, next);
	}
}];

let login = {
	login: async function(req, res, next) {
		console.log('lllllllllllllllllogin');
		let query = {username: req.body.username, password: req.body.password};

		let users = await operationDB({
			req, res,
			method: 'find',
			options: [{$or: [{username: query.username}, {email: query.username}]}],
			model: mod.Model
		});

		if(!users.data.length) {
			res.status(401).json({
				success: false,
				message: '用户不存在',
				data: null
			});
			return;
		}

		let user;
		users.data.map(function(item) {
			if(item.password === query.password) user = item;
		});

		if(user) {
			req.session.user = {
					username: user.username,
					email: user.email,
					_id: user._id,
					role: user.role
				};

			res.json({
				success: true,
				message: '',
				data: {
					username: user.username,
					email: user.email,
					_id: user._id,
					role: user.role
				}
			});
		} else {
			res.status(401).json({
				success: false,
				message: '用户名或密码错误',
				data: null
			})
		}
	}
}
