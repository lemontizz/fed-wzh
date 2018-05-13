var mod = require('../model/user');
var connectionDB = require('../database/connection');

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
		let query = {username: req.body.username, password: unescape(req.body.password)};

		let users = await connectionDB({
			req, res,
			method: 'find',
			doc: {$or: [{username: query.username}, {email: query.username}]},
			model: mod.Model
		});

		if(users.success && !users.data) {
			res.status(401).json({
				success: false,
				message: '用户不存在',
				data: null
			})
		} 

		let user;

		users.data.map(function(item) {
			if(item.password === query.password) user = item;
		});

		if(user) {
			res.json({
				success: true,
				message: '',
				data: user
			})
		} else {
			res.status(401).json({
				success: false,
				message: '用户名或密码错误',
				data: null
			})
		}
	}
}
