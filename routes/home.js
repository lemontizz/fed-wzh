var express = require('express');
var router = express.Router();

module.exports = [{
	method: 'get',
	api: '/home',
	callback: function(req, res, next) {
	  	// res.send('respond with a resource');
	  	res.render('home/home');
	}
}]
