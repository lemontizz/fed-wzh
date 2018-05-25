var operationDB = require('../../database/operation-db');
var mod = require('../../model/user');

module.exports = [{
	method: 'get',
	api: '/account',
	callback: function(req, res, next) {
	  res.render('manage/account/account');
	}
}, {
	method: 'post',
	api: '/account/update',
	callback: async function(req, res, next) {
		let params = req.body;

		let users = await operationDB({
			req, res,
			method: 'find',
			options: [params],
			model: mod.Model
		});

		if(users.data && users.data.length) {
			let message = req.body.username ? '用户名已被使用' : 'Email已被使用';
			res.status(500).json({
				success: false,
				message: message,
				data: null
			});
			return;
		}

		let updateUser = await operationDB({
			req, res,
			method: 'update',
			options: [{_id: req.session.user._id}, params, {password: 0}],
			model: mod.Model
		});
		
		if(!updateUser.success) return;

		let currentUser = await operationDB({
			req, res,
			method: 'findById',
			options: [req.session.user._id, {password: 0}],
			model: mod.Model
		});

		if(currentUser.success) {
			req.session.user = currentUser.data;
			res.json(currentUser);
		}
	}
}, {
	method: 'post',
	api: '/account/change-password',
	callback: async function(req, res, next) {
		let params = req.body;

		let user = await operationDB({
			req, res,
			method: 'findById',
			options: [req.session.user._id],
			model: mod.Model
		});

		if(!user.success) return;

		console.log(user);

		console.log('==========')

		console.log(params);

		if(user.data.password !== params.oldPassword) {
			res.status(400).json({
				success: false,
				message: '旧密码错误',
				data: null
			});
			return;
		}

		let updateUser = await operationDB({
			req, res,
			method: 'update',
			options: [{_id: req.session.user._id}, {password: params.newPassword}],
			model: mod.Model
		});

		if(!updateUser.success) return;

		res.json({
			success: true,
			message: '密码修改成功',
			data: null
		});
	}
}]