const dbConfig = require('./config');
const dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;
const mongoose = require('mongoose');
const logInfo = require('./log-info');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var logSchema = new Schema({
	// id: Schema.Types.ObjectId,
	userId: String,
	detail: String,
}, { timestamps: true });

var logModel = mongoose.model('log', logSchema);
var noUser = ['/register'];

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
	options = null,
	method = '',
	success = null,
	error = null,
	connectionSuccess = null,
	connectionError = null,
	addLog = true,
	log = null
}) {

	return new Promise((resolve, reject) => {

		if(!req || !res || !method || !model) {
			console.log('参数不完整');
			console.log(method, options, model)
			res.status(500).json({
				success: false,
				message: '数据库错误',
				data: null
			});
			reject();
			return;
		}

		// // 连接数据库
		// mongoose.connect(dbUrl, function(err) {
		// 	if(err) {
		// 		console.log('connection failed')
		// 		if(connectionError && typeof connectionError === 'function') {
		// 			connectionError(err);
		// 		} else {
		// 			res.status(500).json({
		// 				success: false,
		// 				message: '连接数据库出错',
		// 				data: null
		// 			});
		// 		}
		// 		reject(err);
		// 		return;
		// 	} 

		// 	console.log('connection success')

		// 	if(connectionSuccess && typeof connectionSuccess === 'function') {
		// 		connectionSuccess();
		// 		resolve();
		// 		return;
		// 	}

			model[method](...options, function(operationErr, result) {
					if(operationErr) {
						console.log('operation failed');
						if(error && typeof error === 'function') {
							error(operationErr);
						} else {
							res.status(500).json({
								success: false,
								message: '数据库操作失败',
								data: null
							});
						}
						reject(err);
						return;
					}
					console.log('operation success');

					if(success && typeof success === 'function') {
						success(result);
					}

					if(typeof result === 'undefined') {
						res.status(500).json({
							success: false,
							message: '操作出错，result为undefined',
							data: null
						});
						reject(result);
						return;
					}

					//写入日志
					try {
						if(addLog) {
							if(req.url === '/login') {
								console.log(result[0]);
								console.log(result[0]._id);
								if(result.length) {
									logModel.create({
										detail: req.body.username + logInfo[req.url][req.method.toLowerCase()],
										userId: result[0]._id,
										username: req.body.username
									});
								}
							} else if(req.url === '/register') {
								console.log(result);
								logModel.create({
									detail: req.body.username + logInfo[req.url][req.method.toLowerCase()],
									userId: result._id.toString(),
									username: req.body.username
								});
							} else {
								logModel.create({
									detail: logInfo[req.url][req.method.toLowerCase()],
									userId: req.session.id,
									username: req.session.username
								});
							}
						}
					} catch(e) {
						console.log('写入log出错', req.url, req.method);
					}

					resolve({
						success: true,
						message: '',
						data: result
					});
				})
		// })
	});
}