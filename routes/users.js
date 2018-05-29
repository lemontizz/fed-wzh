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
		let fileds = req.query.fields.split(','),
			search = req.query.search,
			query = [];

		if(search) fileds.map((i) => query.push({[i.trim()]: {$regex : ".*" + search + ".*", $options: "i"}}));

		paging({
			req,
			res,
			query: query.length ? {$or: query} : {},
			params: [{password: 0}],
			model: mod.Model,
			pageIndex: req.query.pageIndex,
			pageSize: req.query.pageSize
		});
	}
}]