const dbConfig = require('./config');
const dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;
const mongoose = require('mongoose');

/*
*
*param {req} Object - route返回的req参数
*param {res} Object - route返回的res参数
*param {model} Object - 由mongoose生成
*param {doc} Object - 需要操作的数据
*param {method} Object - 需要操作的方法，与mongoose提供的数据操作方法一致
*param {success} Function - 数据操作成功的回调函数
*param {error} Function - 数据操作失败的回调函数
*/

module.exports = function({
	req = null,
	res = null,
	model = null,
	doc = null,
	method = '',
	success = null,
	error = null
}) {

	if(!req || !res || !method || !doc || !model) {
		console.log('参数不完整');
		res.json({
			success: false,
			errorMessage: '数据库错误'
		});
		return;
	} 

	// 连接数据库
	mongoose.connect(dbUrl, function(err) {
		if(err) {
			res.json({
				success: false,
				errorMessage: '连接数据库出错'
			});
			return;
		} 
		
		//操作数据
		model[method](doc, function(operationErr, result) {
			if(err) {
				if(error && typeof error === 'function') error(operationErr);

				res.json({
					success: false,
					errorMessage: '数据库操作失败'
				});
				return;
			}

			if(success && typeof success === 'function') success(result);
		})
	})
}