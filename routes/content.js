var express = require('express');
var router = express.Router();

module.exports = [{
	method: 'get',
	api: '/content',
	callback: function(req, res, next) {
		console.log('sfwerwerwerwerwerrew')
	  	// res.send('respond with a resource');
	  	res.render('content/content', { title: 'content' });
	}
}]
