module.exports = [{
	method: 'get',
	api: '/register',
	callback: function(req, res, next) {
	  	res.render('register/register');
	}
}
, {
	method: 'post',
	api: '/register',
	callback: function(req, res, next) {
		console.log(req);
		setTimeout(function() {
			res.json({});
		}, 3000)
	}
}
]