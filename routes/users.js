var operationDB = require('../database/operation-db');
var paging = require('../database/db-paging');
var mod = require('../model/user');

module.exports = [{
	method: 'get',
	api: '/user-manage',
	callback: function(req, res, next) {
	  	res.render('manage/user/user');
	}
}, {
	method: 'get',
	api: '/user-list',
	callback: function(req, res, next) {
		paging({
			req,
			res,
			query: req.query.search || {},
			params: [{password: 0}],
			model: mod.Model,
			pageIndex: req.query.pageIndex,
			pageSize: req.query.pageSize
		});
	}
}]