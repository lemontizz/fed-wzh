var operationDB = require('../database/operation-db');
var mod = require('../model/user');

module.exports = [{
	method: 'get',
	api: '/user-manage',
	callback: async function(req, res, next) {
		let users = await operationDB({
			req, res,
			method: 'find',
			options: [null, {password: 0}],
			model: mod.Model
		});

		if(users.success) {
			res.locals.viewBag.userList = users.data;
		}

	  	res.render('manage/user/user');
	}
}, {
	method: 'get',
	api: '/user-list',
	callback: function(req, res, next) {
		
	}
}]