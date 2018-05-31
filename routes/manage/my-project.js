var express = require('express');
var router = express.Router();

module.exports = [{
	method: 'get',
	api: '/my-project',
	callback: function(req, res, next) {
	  	res.render('manage/my-project/my-project');
	}
}, {
	method: 'get',
	api: '/upload-project',
	callback: function(req, res, next) {
	  	res.render('manage/my-project/upload-project');
	}
}]
