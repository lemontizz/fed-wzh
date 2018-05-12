// var mongoose = require('mongoose');
const dbConfig = require('../database/config');
const dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;
const mongoose = require('mongoose');
// var connectionDB = require('../database/connection');



module.exports = [{
	method: 'get',
	api: '/register',
	callback: function(req, res, next) {
	  	res.render('register/register');
	}
}, {
	method: 'post',
	api: '/register',
	callback: function(req, res, next) {
		console.log('werwrwer')

		console.log('~~~~~~~~~~~~~~~~')
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

			var Schema = mongoose.Schema;
			var userSchema = new Schema({
				email: String,
				username: String,
				password: String
			}, { timestamps: true });
			var UserModel = mongoose.model('users', userSchema);
			var userDoc = new UserModel({
				username: req.body.username,
				password: req.body.password,
				email: req.body.email
			});

			userDoc.save(function(err, doc) {
				if(err) {
					res.json({
						statusCode: 500,
						success: false,
						errorMessage: '数据库操作出错'
					});
				} else {
					res.json({
						success: true,
						data: doc
					});
				}
			});

			UserModel.find(function(err, docs) {
				if(err) {
					console.log('查询出错')
				} else {
					console.log('------');
					console.log(docs);
				}
			})

		})

		// connectionDB(req, res, null, function(docs) {
		// 	var Schema = mongoose.Schema;
		// 	var userSchema = new Schema({
		// 		email: String,
		// 		username: String,
		// 		password: String
		// 	}, { timestamps: true });
		// 	var UserModel = mongoose.model('users', userSchema);
		// 	var userDoc = new UserModel({
		// 		username: req.body.username,
		// 		password: req.body.password,
		// 		email: req.body.email
		// 	});

		// 	UserModel.create(function(err, doc) {
		// 		if(err) {
		// 			res.json({
		// 				statusCode: 500,
		// 				success: false,
		// 				errorMessage: '数据库操作出错'
		// 			});
		// 		} else {
		// 			res.json({
		// 				success: true,
		// 				data: doc
		// 			});
		// 		}
		// 	})
			
		// });
	}
}]