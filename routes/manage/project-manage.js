var express = require('express');
var router = express.Router();

module.exports = [{
	method: 'get',
	api: '/project-manage',
	callback: function(req, res, next) {
	  	res.render('manage/project-manage/project-manage');
	}
}]
