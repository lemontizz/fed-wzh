var express = require('express');
var router = express.Router();
var users = require('./users');
var login = require('./login');
var register = require('./register');
var home = require('./home');
var allRouters = [...users, ...login, ...register, ...home];

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

for(var i = 0; i < allRouters.length; i++) {
	(function(route) {
		router[route.method](route.api, function(req, res, next) {
			route.callback(req, res, next);
		});
	})(allRouters[i]);
}

module.exports = router;