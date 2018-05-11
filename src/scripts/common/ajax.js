define(function(require, exports, module) {
	var $ = require('jquery'),
		loading = require('loading'),
		prompt = require('prompt');

	module.exports = function({
			url = '',
			method = 'get',
			contentType = 'application/json',
			headers = {},
			alertErrorInfo = true,
			showLoading = true,
			data = {}
		}) {

		let finalHeaders = Object.assign({}, headers),
			$loading = $('#page-loading');

		return $.ajax({
			url,
			method,
			contentType,
			headers: finalHeaders,
			data: data,
			beforeSend: function() {
				console.log(loading);
				if(showLoading) loading.show();
			},
			complete: function() {
				if(showLoading) loading.hide();
			},
			error: function(err) {
				if(alertErrorInfo) {
					prompt({
						message: err.message || '请求出错'
					})
				}
			}
		})
	}
});