var express = require('express');
var router = express.Router();
var login = require('./login');
var register = require('./register');
var home = require('./home');
var account = require('./manage/account');
var users = require('./manage/users');
var myProject = require('./manage/my-project');
var projectManage = require('./manage/project-manage');
var allRouters = [...users, ...login, ...register, ...home, ...account, ...myProject, ...projectManage];

router.get('/', function(req, res, next) {
  	res.render('home/home');
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	res.locals.viewBag.user = null;
	res.render('home/home');
})

for(var i = 0; i < allRouters.length; i++) {
	(function(route) {
		router[route.method](route.api, function(req, res, next) {
			route.callback(req, res, next);
		});
	})(allRouters[i]);
}

module.exports = router;