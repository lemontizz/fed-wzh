module.exports = [{
	method: 'get',
	api: '/users',
	callback: function(req, res, next) {
	  // res.send('respond with a resource');
	  res.render('user/user_list', { title: 'Users' });
	}
}]