// var user = require('../database/db').user;
var userModel = require('../model/login');



module.exports = [{
	method: 'get',
	api: '/login',
	callback: function(req, res, next) {
	  res.render('login/login', { title: 'Login' });
	}
}, {
	method: 'post',
	api: '/login',
	callback: function(req, res, next) {
		var query = {name: req.body.username, password: req.body.password};

		userModel.getUser(query);

		// (function() {
			// user.count(query, function(err, doc) {
			// 	if(doc === 1) {
			// 		console.log(query.name + ': 登陆成功 ' + Date.now());
			// 		res.render('content', {title: 'content'})
			// 	} else {
			// 		console.log(query.name + ': 登陆失败 ' + Date.now());
			// 		res.redirect('/');
			// 	}
			// })
		// })(query);
	}
}];
