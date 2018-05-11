const dbConfig = require('./config');
const dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;
const mongoose = require('mongoose');

module.exports = function(req, res, params, callback) {
	mongoose.connect(dbUrl, function(err) {
		if(err) {
			res.json({
				statusCode: 500,
				success: false,
				errorMessage: '连接数据库出错'
			});
			return;
		} 

		console.log('数据库连接成功');
		console.log(params);

		console.log('------------')

		callback();

		return;
		
		// [params.model][params.method](params.data, function(err, docs) {
		// 	if(err) {
		// 		res.json({
		// 			statusCode: 500,
		// 			success: false,
		// 			errorMessage: '数据库操作出错'
		// 		});
		// 		return;
		// 	} 

		// 	console.log('数据库操作成功');

		// 	callback();
		// })
	})
}