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
		console.log('======');
		console.log(req.body);

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
}]