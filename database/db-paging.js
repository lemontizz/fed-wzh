const mongoose = require('mongoose');
const logInfo = require('./log-info');
const async = require('async');

/*
*param {req} Object - route返回的req参数
*param {res} Object - route返回的res参数
*param {model} Object - 由mongoose生成
*param {options} Object - Model.findById(id, [projection], [options], [callback]) 和mongoose提供的参数一致，按顺序传入，不按名称
*param {method} Object - 需要操作的方法，与mongoose提供的数据操作方法一致
*param {success} Function - 数据操作成功的回调函数
*param {error} Function - 数据操作失败的回调函数
*/

module.exports = function({
	req = null,
	res = null,
	model = null,
	pageSize = 10,
	pageIndex = 1,
	params = [],
	query = {},
	populate = null,
	success = null,
	error = null
}) {

	console.log('werjkdfjdskjfksdjfksjfksjdfksjfk111111111')

	let start = pageIndex * pageSize - pageSize;
	params.unshift(query);
	params.push({
		skip: start,
		limit: Number(pageSize)
	});

	async.parallel({
		count: function(done) {
			model.count(query).exec(function(err, count) {
				console.log(count);
				done(err, count);
			})
		},
		records: function(done) {
			console.log(']]]]]]');
			console.log(...params);
			model.find(...params, function(err, doc) {
				console.log(doc);
				done(err, doc);
			});
		}
	}, function(err, result) {
		if(err) {
			if(typeof error === 'function') {
				error(err, result);
			} else {
				res.status(500).json({
					success: false,
					message: '查询出错',
					data: null
				});
			}
		} else {
			if(typeof success === 'function') {
				success({
					success: true,
					message: '',
					data: result.records || [],
					count: result.count || 0
				});
			} else {
				res.json({
					success: true,
					message: '',
					data: result.records || [],
					count: result.count || 0
				});
			}
		}
	})
}