module.exports = [{
	method: 'get',
	api: '/account',
	callback: function(req, res, next) {
	  res.render('manage/account/account');
	}
}]