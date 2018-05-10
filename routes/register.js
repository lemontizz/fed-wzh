module.exports = [{
	method: 'get',
	api: '/register',
	callback: function(req, res, next) {
	  res.render('register/register');
	}
}]