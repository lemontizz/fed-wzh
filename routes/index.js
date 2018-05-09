var express = require('express');
var router = express.Router();
var content = require('./content');
var users = require('./users');
var login = require('./login');
var allRouters = [...content, ...users, ...login]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

for(var i = 0; i < allRouters.length; i++) {
	var currentRouter = allRouters[i];
	router[currentRouter.method](currentRouter.api, currentRouter.callback);
}

module.exports = router;