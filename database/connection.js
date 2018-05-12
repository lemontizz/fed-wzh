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

	return new Promise((resolve, reject) => {

		if(!req || !res || !method || !doc || !model) {
			console.log('参数不完整');
			res.status(500).json({
				success: false,
				message: '数据库错误',
				data: null
			});
			reject(err);
			return;
		}

		// 连接数据库
		mongoose.connect(dbUrl, function(err) {
			if(err) {
				res.status(500).json({
					success: false,
					message: '连接数据库出错',
					data: null
				});
				reject(err);
				return;
			} 
			
			//操作数据
			model[method](doc, function(operationErr, result) {
				if(err) {
					if(error && typeof error === 'function') error(operationErr);

					res.status(500).json({
						success: false,
						message: '数据库操作失败',
						data: null
					});
					reject(err);
					return;
				}

				if(success && typeof success === 'function') {
					success(result);
				}

				resolve({
					success: true,
					message: '',
					data: result
				});
			})
		})
	});
}